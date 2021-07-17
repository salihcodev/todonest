import { CreateTodoDto } from '../../common/dtos/todo/create-todo.dto';
import { Todo } from 'src/common/entities/todo/todo.entity';
import { EntityRepository, Repository } from 'typeorm';
import { TodoStatus } from 'src/common/enums/todo-status.enum';
import { GetFilterDto } from 'src/common/dtos/todo/filter-todo.dto';
import { NotFoundException } from '@nestjs/common';
import { User } from 'src/common/entities/user/user.entity';

@EntityRepository(Todo)
export class TodoRepository extends Repository<Todo> {
  // GET ALL EXISTED TODOS, OR WITH FILTER:
  async getAllTodos(getFilterDto: GetFilterDto, user: User): Promise<Todo[]> {
    const { status, search } = getFilterDto;

    // instantiate new query builder:
    const query = this.createQueryBuilder('todo');

    // return back only current user's todo: AKA `ownership`
    query.where('todo.userId = :userId', { userId: user.id });

    // issue the status:
    if (status) query.andWhere('todo.status = :status', { status });

    // issue the title & description:
    if (search)
      query.andWhere(
        '(todo.title LIKE :search OR todo.description LIKE :search)',
        { search: `%${search}%` },
      );

    const todos = await query.getMany();
    return todos;
  }

  // GET CERTAIN TODO VIA ITS ID:
  async getTodoById(id: number, user: User): Promise<Todo> {
    const foundTodo = await this.findOne({ where: { id, userId: user.id } });

    if (!foundTodo) {
      throw new NotFoundException(
        `There is no todo correspond to the given id: [${id}]`,
      );
    }

    return foundTodo;
  }

  // CREATE NEW TODO:
  async createTodo(createTodoDto: CreateTodoDto, user: User): Promise<Todo> {
    const { title, description } = createTodoDto;

    const todo = new Todo();
    todo.title = title;
    todo.user = user;
    todo.description = description;

    // SAVE THE TODO:
    await todo.save();

    /* 
      delete user after creation
        'prevent user from returning back in creation response.' 
     */
    delete todo.user;

    return todo;
  }

  // UPDATE CERTAIN TODO VIA ITS ID:
  async updateTodo(id: number, status: TodoStatus, user: User): Promise<Todo> {
    const foundTodo = await this.getTodoById(id, user);

    foundTodo.status = status;
    await foundTodo.save();

    return foundTodo;
  }

  // DELETE CERTAIN TODO VIA ITS ID:
  async deleteTodo(id: number, user: User): Promise<void> {
    const res = await this.delete({ id, userId: user.id });

    if (res.affected === 0)
      throw new NotFoundException(
        `There is no todo correspond to the given id: [${id}]`,
      );
  }
}

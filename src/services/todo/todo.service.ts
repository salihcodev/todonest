import { TodoStatus } from './../../common/enums/todo-status.enum';
import { CreateTodoDto } from '../../common/dtos/todo/create-todo.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/common/entities/todo/todo.entity';
import { TodoRepository } from 'src/repositories/todo/todo.repository';
import { User } from 'src/common/entities/user/user.entity';
import { GetFilterDto } from 'src/common/dtos/todo/filter-todo.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(TodoRepository)
    private todoRepository: TodoRepository,
  ) {}

  // GET ALL TODOS:
  async getAllTodos(getFilterDto: GetFilterDto, user: User): Promise<Todo[]> {
    return this.todoRepository.getAllTodos(getFilterDto, user);
  }

  // GET CERTAIN TODO VIA ITS ID:
  async getTodoById(id: number, user: User): Promise<Todo> {
    return this.todoRepository.getTodoById(id, user);
  }

  // CREATE NEW TODO WITH THE HELP OF  TYPEORM:
  async createTodo(createTodoDto: CreateTodoDto, user: User): Promise<Todo> {
    return this.todoRepository.createTodo(createTodoDto, user);
  }

  async updateTodo(id: number, status: TodoStatus, user: User): Promise<Todo> {
    return this.todoRepository.updateTodo(id, status, user);
  }

  // DELETE CERTAIN TODO VIA UTS ID:
  async deleteTodo(id: number, user: User): Promise<void> {
    return this.todoRepository.deleteTodo(id, user);
  }
}

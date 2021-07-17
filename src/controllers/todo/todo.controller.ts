import { TodoStatusValidator } from '../../common/pipes/todo/todo-status.pipe';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TodosService } from 'src/services/todo/todo.service';
import { CreateTodoDto } from 'src/common/dtos/todo/create-todo.dto';
import { TodoStatus } from 'src/common/enums/todo-status.enum';
import { Todo } from 'src/common/entities/todo/todo.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/common/decorators/getUser.decorator';
import { User } from 'src/common/entities/user/user.entity';
import { GetFilterDto } from 'src/common/dtos/todo/filter-todo.dto';

@Controller('api/todos')
@UseGuards(AuthGuard())
export class TodoController {
  /*  @Inject() to avoid passing the provider/s that injectable class depending
      on, via calling `super()`  */
  constructor(@Inject(TodosService) private todosService: TodosService) {}

  @Get()
  getAllTodos(
    @Query(ValidationPipe) getFilterDto: GetFilterDto,
    @GetUser() user: User,
  ): Promise<Todo[]> {
    return this.todosService.getAllTodos(getFilterDto, user);
  }

  @Get('/:id')
  getTodoById(@Param('id') id: number, @GetUser() user: User): Promise<Todo> {
    return this.todosService.getTodoById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTodo(
    @Body() createTodoDto: CreateTodoDto,
    @GetUser() user: User,
  ): Promise<Todo> {
    return this.todosService.createTodo(createTodoDto, user);
  }

  @Patch('/:id/status')
  updateTodo(
    @Body('status', TodoStatusValidator) status: TodoStatus,
    @Param('id') id: number,
    @GetUser() user: User,
  ): Promise<Todo> {
    return this.todosService.updateTodo(id, status, user);
  }

  @Delete('/:id')
  async deleteTodo(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    await this.todosService.deleteTodo(id, user);
  }
}

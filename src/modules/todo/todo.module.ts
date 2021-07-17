import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoController } from 'src/controllers/todo/todo.controller';
import { TodoRepository } from 'src/repositories/todo/todo.repository';
import { TodosService } from 'src/services/todo/todo.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([TodoRepository]), AuthModule],
  controllers: [TodoController],
  providers: [TodosService],
})
export class TodoModule {}

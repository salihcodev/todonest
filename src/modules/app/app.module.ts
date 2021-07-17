import { Module } from '@nestjs/common';
import { TodoModule } from '../todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMpsqlConfiguration } from 'src/configs/typeORM.config';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMpsqlConfiguration),
    TodoModule,
    AuthModule,
  ],
})
export class AppModule {}

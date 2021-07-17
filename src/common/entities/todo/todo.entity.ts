import { TodoStatus } from 'src/common/enums/todo-status.enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: TodoStatus.OPEN })
  status: TodoStatus;

  @ManyToOne((type) => User, (user) => user.todos, { eager: false })
  user: User;

  @Column()
  userId: number;
}

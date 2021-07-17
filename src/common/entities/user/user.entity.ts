import * as bcrypt from 'bcrypt';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Unique,
  OneToMany,
} from 'typeorm';
import { Todo } from '../todo/todo.entity';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToMany((type) => Todo, (todo) => todo.user, { eager: true })
  todos: Todo[];

  async isPasswordValid(password: string): Promise<boolean> {
    const res = await bcrypt.hash(password, this.salt);

    // also we can make use of built-in compare method to check for password validation:
    return res === this.password;
  }
}

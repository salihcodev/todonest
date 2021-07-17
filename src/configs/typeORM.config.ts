import * as config from 'config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Todo } from 'src/common/entities/todo/todo.entity';
import { User } from 'src/common/entities/user/user.entity';

// get configs:
const { host } = config.get('server');
const { type, port, username, password, database, synchronize } =
  config.get('db');

export const typeORMpsqlConfiguration: TypeOrmModuleOptions = {
  type: process.env.DB_TYPE || type,
  host: process.env.DB_HOST || host,
  port: process.env.DB_PORT || port,
  username: process.env.DB_USERNAME || username,
  password: process.env.DB_PASSWORD || password,
  database: process.env.DB_PASSWORD || database,
  entities: [Todo, User],
  synchronize: process.env.ORM_SYNCH || synchronize,
  // autoLoadEntities: true, // load entities that placed in entity's module.
};

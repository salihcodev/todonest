import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import * as config from 'config';
import { Logger } from '@nestjs/common';

async function appEntry() {
  // create logger instance:
  const logger = new Logger(`App Entry`);

  // get the env. configs:
  const { port: _port } = config.get('server');

  const port = process.env.PORT || _port;

  // instantiate the app module:
  const app = await NestFactory.create(AppModule);

  // listening:
  await app.listen(port);

  // check wether the app starts successfully ot not:
  logger.verbose('App starts successfully');
}
appEntry();

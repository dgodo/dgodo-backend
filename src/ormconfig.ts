require('dotenv').config();
import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  subscribers: ['src/subscriber/**/*.ts'],

  cli: {
    migrationsDir: 'src/migrations',
    subscribersDir: 'src/subscriber',
  },
};

export = config;

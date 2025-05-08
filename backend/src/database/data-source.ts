import { User } from '../users/users.entity';
import { Role } from '../roles/roles.entity';
import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';

const dataSourceOptions: DataSourceOptions = {
  type: 'sqlite',
  database: join(__dirname, '../../database.sqlite'),
  entities: [User, Role],
  migrations: [join(__dirname, '..', 'migration', '*{.ts,.js}')],
  migrationsTableName: 'migrations',
  synchronize: false,
  logging: true,
};

export const AppDataSource = new DataSource(dataSourceOptions);

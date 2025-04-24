import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { BlacklistedToken } from '../entities/blacklisted-token.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'auth_postgresql',
  database: process.env.DB_NAME || 'postgres',
  entities: [User, BlacklistedToken],
  synchronize: true, // В продакшене должно быть false
  logging: true,
};

import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { SeederOptions } from 'typeorm-extension';
import { UserSeeder } from 'database/seeds/user.seeder';
import { AuthSeeder } from 'database/seeds/auth.seeder';
import { GroupSeeder } from 'database/seeds/group.seeder';
import { PostSeeder } from 'database/seeds/post.seeder';

const nodeEnv = process.env.NODE_ENV || 'development';
config({ path: `env/.${nodeEnv}.env` });

// NestJS에서 사용되는 설정
export const typeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: configService.get('DB_HOST') || 'localhost',
    port: parseInt(configService.get('DB_PORT') || '5432', 10),
    username: configService.get('DB_USERNAME') || 'postgres',
    password: configService.get('DB_PASSWORD') || 'postgres',
    database: configService.get('DB_DATABASE') || 'ssuled',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: configService.get('NODE_ENV') !== 'production',
    logging: configService.get('NODE_ENV') !== 'production',
    migrations: [__dirname + '/../database/migrations/**/*.{js,ts}'],
    migrationsTableName: 'migrations',
  };
};

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'ssuled',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: [__dirname + '/../database/migrations/**/*.{js,ts}'],
  migrationsTableName: 'migrations',
  seeds: [UserSeeder, AuthSeeder, GroupSeeder, PostSeeder],
};

// TypeORM CLI를 위한 DataSource 인스턴스
export const AppDataSource = new DataSource(dataSourceOptions);

// 기존 호환성을 위한 내보내기
export default typeOrmConfig;

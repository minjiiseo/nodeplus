import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const typeOrmModuleOptions: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (ConfigService: ConfigService) => ({
    namingStrategy: new SnakeNamingStrategy(),
    type: 'mysql',
    host: ConfigService.get<string>('DB_HOST'),
    port: ConfigService.get<number>('DB_PORT'),
    username: ConfigService.get<string>('DB_USERNAME'),
    password: ConfigService.get<string>('DB_PASSWORD'),
    database: ConfigService.get<string>('DB_NAME'),
    synchronize: ConfigService.get<boolean>('DB_SYNC'),
    autoLoadEntities: true,
    logging: true,
  }),
};

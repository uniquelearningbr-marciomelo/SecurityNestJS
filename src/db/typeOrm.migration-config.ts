import { config } from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';

config();

const configService = new ConfigService();

const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_DATABASE'),
    entities: [],
    // migrations: [__dirname + '/migrations/*.ts'],
    synchronize: false,
}

export default new DataSource(dataSourceOptions);
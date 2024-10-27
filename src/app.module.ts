import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';
// import { ClienteModule } from './db/entities/cliente/cliente.module';
import { UsersModule } from './db/entities/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // ClienteModule,
    UsersModule,
    AuthModule,
    DbModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }

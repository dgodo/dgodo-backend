import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import ormconfig from "./ormconfig";
import {TypeOrmModule} from "@nestjs/typeorm";
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, User])],
  providers: [TasksService, UsersService],
  controllers: [TasksController],
})
export class TasksModule {}

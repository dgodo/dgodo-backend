import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/users/users.guard';
import { CompleteTaskDto } from './dto/complete-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';

@UseGuards(AuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get('/')
  async todo(@Request() req) {
    const userId = req.user.id;

    const tasks = await this.taskService.getInCompleteTasks(userId);

    return { tasks };
  }

  @Post('/new')
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    const task = await this.taskService.createTask(createTaskDto);
    return { task };
  }

  @Patch('/complete')
  async completeTask(@Body() completeTaskDto: CompleteTaskDto, @Request() req) {
    completeTaskDto.userId = req.user.id;
    await this.taskService.completeTask(completeTaskDto);
    return { ch: 'ch' };
  }
}

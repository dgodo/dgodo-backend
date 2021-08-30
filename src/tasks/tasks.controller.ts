import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { CompleteTaskDto } from './dto/complete-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get('/')
  async todo() {
    const userId = 'c3b60333-2027-42a3-a2e1-c388bbbe4011';

    const tasks = await this.taskService.getInCompleteTasks(userId);

    return { tasks };
  }

  @Post('/new')
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    const task = await this.taskService.createTask(createTaskDto);
    return { task };
  }

  @Patch('/complete')
  async completeTask(@Body() completeTaskDto: CompleteTaskDto) {
    await this.taskService.completeTask(completeTaskDto);
    return { ch: 'ch' };
  }
}

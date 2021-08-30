import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { CompleteTaskDto } from './dto/complete-task.dto';
import { Task } from './tasks.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly taskRepo: Repository<Task>,
  ) {}

  async createTask(createTaskDto: CreateTaskDto) {
    const task = new Task();
    task.text = createTaskDto.text;
    task.completedUsers = [];

    return this.taskRepo.save(task);
  }

  async getInCompleteTasks(userId: string) {
    const tasks = await this.taskRepo
      .createQueryBuilder('task')
      .where('task.completedUsers NOT IN (:userId)', { userId: [userId] })
      .execute();
    console.log(tasks);
    return tasks;
  }

  async getTaskById(taskId: string) {
    return this.taskRepo.findOne(taskId);
  }

  async completeTask(completeTaskDto: CompleteTaskDto) {
    const { taskId, userId } = completeTaskDto;

    const task = await this.getTaskById(taskId);

    if (!task) {
      throw new BadRequestException(
        `Task ${completeTaskDto.taskId} not found!`,
      );
    }

    if (task.deletedAt) {
      throw new BadRequestException(`Task ${taskId}`);
    }

    if (task.completedUsers.includes(userId)) {
      throw new BadRequestException(
        `Task ${taskId} is already marked as complete for user ${userId}`,
      );
    }

    this.taskRepo.update(completeTaskDto.taskId, {
      completedUsers: [...task.completedUsers, userId],
    });
  }
}

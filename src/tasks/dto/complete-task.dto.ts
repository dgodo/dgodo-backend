import { IsUUID } from 'class-validator';
import { User } from 'src/users/users.entity';

export class CompleteTaskDto {
  taskId: string;

  userId: string;
}

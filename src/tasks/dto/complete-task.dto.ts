import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CompleteTaskDto {
  @ApiProperty()
  @IsUUID()
  taskId: string;

  userId: string;
}

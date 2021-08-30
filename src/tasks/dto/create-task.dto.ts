import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { User } from 'src/users/users.entity';

export class CreateTaskDto {
  @ApiProperty()
  @IsNotEmpty()
  text: string;
}

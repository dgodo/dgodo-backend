import { IsNotEmpty } from 'class-validator';
import { User } from 'src/users/users.entity';

export class CreateTaskDto {
  @IsNotEmpty()
  text: string;
}

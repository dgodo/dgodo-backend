import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('/auth')
  async authenticateUser(@Body() createUserDto: CreateUserDto) {
    let user: User;
    try {
      user = await this.userService.createUser(createUserDto);
    } catch (e) {
      user = await this.userService.getByUsername(createUserDto.username);
    }
    return { user };
  }
}

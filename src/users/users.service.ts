import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async getByUsername(username: string) {
    return this.userRepo.findOne({
      where: {
        username,
      },
    });
  }

  async getById(id: string) {
    return this.userRepo.findOne(id);
  }

  async createUser(createUserDto: CreateUserDto) {
    return this.userRepo.save(createUserDto);
  }
}

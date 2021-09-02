import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly userService: UsersService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const id = request.headers.authorization;

    if (id === null) {
      return false;
    }

    const user = await this.userService.getById(id);

    if (!user) {
      return false;
    }

    request.user = user;

    return true;
  }
}

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
    const username = request.headers.authorization;

    if (username === null) {
      return false;
    }

    const user = await this.userService.getByUsername(username);

    if (!user) {
      return false;
    }

    request.user = user;

    return true;
  }
}

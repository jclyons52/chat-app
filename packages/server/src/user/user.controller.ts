import { Controller, Post, Response, Body, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserDTO } from 'shared/types';
import { Response as IResponse } from 'express';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @Post()
    async addUser(@Body('userName') userName): Promise<UserDTO> {
        return this.userService.addUser(userName);
    }
}
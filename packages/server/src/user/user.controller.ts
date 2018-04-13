import { Body, Controller, Post } from '@nestjs/common';
import { UserDTO } from 'shared/types';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @Post()
    async addUser(@Body('userName') userName): Promise<UserDTO> {
        return this.userService.addUser(userName);
    }
}
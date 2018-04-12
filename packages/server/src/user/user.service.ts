import { Component, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Component()
export class UserService {
    private USERS: User[] = [];

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async addUser(userName: string): Promise<User> {
        if (this.USERS.find(user => user.name === userName)) {
            throw new Error('user name already taken');
        }
        const user = await this.getUser(userName);
        this.USERS.push(user);
        return user;
    }

    private async getUser(userName: string): Promise<User> {
        const users = await this.userRepository.find({ name: userName });
        if (users.length === 0) {
            const user: User = new User();
            user.name = userName;
            return this.userRepository.save(user);
        }
        else {
            return users[0];
        }
    }
}
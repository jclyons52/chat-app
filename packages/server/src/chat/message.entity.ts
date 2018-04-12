import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'user/user.entity';

@Entity()
export class Message {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    message: string;

    @ManyToOne(type => User, user => user.messages)
    user: User;
}
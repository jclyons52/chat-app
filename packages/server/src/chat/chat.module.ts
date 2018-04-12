import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { UserService } from 'user/user.service';

@Module({
    controllers: [ChatController],
    components: [ChatService, ChatGateway],
})
export class ChatModule {}
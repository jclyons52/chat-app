import { WebSocketGateway, NestGateway, SubscribeMessage } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { Message } from './message.entity';
import { User } from 'user/user.entity';

@WebSocketGateway({ port: 1080, namespace: 'messages' })
export class ChatGateway implements NestGateway {
    socket: Socket;

    constructor(private chatService: ChatService) {}

    handleDisconnect(socket) {}

    @SubscribeMessage({ value: 'data' })
    handleGetAddMessage(sender, message: Message) {
        this.chatService.storeMessage(message);
        sender.emit('newMessage', message);
        sender.broadcast.emit('newMessage', message);
    }

    @SubscribeMessage({ value: 'isWriting' })
    handleWriting(sender, user: User) {
        sender.broadcast.emit('isWriting', user);
    }

    @SubscribeMessage({ value: 'isNotWriting' })
    handleNotWriting(sender) {
        sender.broadcast.emit('isNotWriting');
    }
}
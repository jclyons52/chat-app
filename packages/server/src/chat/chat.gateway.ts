import { NestGateway, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { ALL_MESSAGES, DATA, IS_NOT_WRITING, IS_WRITING, NEW_MESSAGE } from 'shared/messages';
import { Socket } from 'socket.io';
import { User } from 'user/user.entity';
import { ChatService } from './chat.service';
import { Message } from './message.entity';
@WebSocketGateway({ port: 1080, namespace: 'messages' })
export class ChatGateway implements NestGateway {
    socket: Socket;

    constructor(private chatService: ChatService) {}

    afterInit(server) {}

    handleConnection(socket) {
        process.nextTick(() => {
            this.socket.emit(ALL_MESSAGES, this.chatService.getMessages());
        });
    }

    handleDisconnect(socket) {}

    @SubscribeMessage({ value: DATA })
    handleGetAddMessage(sender, message: Message) {
        this.chatService.storeMessage(message);
        sender.emit(NEW_MESSAGE, message);
        sender.broadcast.emit(NEW_MESSAGE, message);
    }

    @SubscribeMessage({ value: IS_WRITING })
    handleWriting(sender, user: User) {
        sender.broadcast.emit(IS_WRITING, user);
    }

    @SubscribeMessage({ value: IS_NOT_WRITING })
    handleNotWriting(sender) {
        sender.broadcast.emit(IS_NOT_WRITING);
    }
}
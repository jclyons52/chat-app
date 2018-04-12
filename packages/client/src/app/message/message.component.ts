import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { MessageDTO, UserDTO } from 'shared/types';
import { MessageService } from './message.service';
import { UserService } from '../user/user.service';
import Socket = SocketIOClient.Socket;
import { NEW_MESSAGE, IS_WRITING, IS_NOT_WRITING, ALL_MESSAGES } from 'shared/messages';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  messages: MessageDTO[] = [];
  @Input() messageInput: string;
  writing: string;
  actualUser: UserDTO;

  private socket: Socket;
  private timer;

  constructor(
    private messageService: MessageService,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.actualUser = this.userService.userConnected;
    this.socket = this.messageService.connectSocket();
    this.socket.on(ALL_MESSAGES, (message: MessageDTO[]) => this.messages = message);
    this.socket.on(NEW_MESSAGE, (message: MessageDTO) => this.messages.push(message));
    this.socket.on(IS_WRITING, (user: UserDTO) => this.writing = user.name);
    this.socket.on(IS_NOT_WRITING, () => this.writing = '');
  }

  isWriting() {
    this.messageService.isWriting(this.actualUser);
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  isNotWriting() {
    this.timer = setTimeout(() => {
      this.messageService.isNotWriting();
    }, 2000);
  }

  sendMessage() {
    this.messageService.sendMessage({ message: this.messageInput, user: this.actualUser });
    this.messageInput = '';
    this.messageService.isNotWriting();
  }

}

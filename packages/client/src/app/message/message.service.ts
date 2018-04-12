import * as io from 'socket.io-client';
import { Constants } from '../shared/constants';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { MessageDTO, UserDTO } from 'shared/types';
import Socket = SocketIOClient.Socket;
import {IS_WRITING, IS_NOT_WRITING, DATA } from 'shared/messages';
@Injectable()
export class MessageService {

  private socket: Socket;

  constructor(private http: Http) { }

  connectSocket (): Socket {
    this.socket = io(`http://${Constants.IP}:${Constants.SOCKET_SERVER_PORT}/messages`);
    return this.socket;
  }

  isWriting(user: UserDTO) {
    this.socket.emit(IS_WRITING, user);
  }

  isNotWriting () {
    this.socket.emit(IS_NOT_WRITING);
  }

  sendMessage (message: MessageDTO) {
    this.socket.emit(DATA, message);
  }
}

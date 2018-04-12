import * as io from 'socket.io-client';
import { Constants } from '../shared/constants';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { MessageDTO, UserDTO } from 'shared/types';
import Socket = SocketIOClient.Socket;

@Injectable()
export class MessageService {

  private socket: Socket;

  constructor(private http: Http) { }

  connectSocket (): Socket {
    this.socket = io(`http://${Constants.IP}:${Constants.SOCKET_SERVER_PORT}/messages`);
    return this.socket;
  }

  isWriting(user: UserDTO) {
    this.socket.emit('isWriting', user);
  }

  isNotWriting () {
    this.socket.emit('isNotWriting');
  }

  sendMessage (message: MessageDTO) {
    this.socket.emit('data', message);
  }
}

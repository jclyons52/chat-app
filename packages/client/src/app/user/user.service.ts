import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Constants } from '../shared/constants';
import { UserDTO } from 'shared/types';

@Injectable()
export class UserService {

  userConnected: UserDTO;

  constructor(private http: Http) { }

  sendUserName(userName: string) {
    return this.http.post(`http://${Constants.IP}:${Constants.SERVER_PORT}/users`, { userName: userName })
    .toPromise();
  }

  getUserById(id: number) {
    return this.http.get(`http://${Constants.IP}:${Constants.SERVER_PORT}/users/${id}`)
    .toPromise();
  }

}

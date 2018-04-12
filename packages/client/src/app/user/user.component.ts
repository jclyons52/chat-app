import { Component, OnInit, Input } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input() userName: string;

  error: string;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  sendUserName (): void {
    this.error = '';
    this.userService.sendUserName(this.userName)
    .then(res => {
      this.userService.userConnected = res.json();
      this.router.navigate([ '/messages', this.userService.userConnected.name ]);
    })
    .catch(err => {
      err = err.json();
      this.error = err;
    });
  }

}

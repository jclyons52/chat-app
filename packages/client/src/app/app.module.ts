import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutesModule } from './app.router';
import { MessageComponent } from './message/message.component';
import { UserComponent } from './user/user.component';
import { MessageService } from './message/message.service';
import { UserService } from './user/user.service';


@NgModule({
  declarations: [
    AppComponent,
    MessageComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutesModule
  ],
  providers: [ MessageService, UserService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

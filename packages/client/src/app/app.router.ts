import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { MessageComponent } from './message/message.component';


const appRoutes: Routes = [
    { path: 'users', component: UserComponent },
    { path: 'messages/:userName', component: MessageComponent }
];

export const AppRoutesModule: ModuleWithProviders = RouterModule.forRoot(appRoutes);

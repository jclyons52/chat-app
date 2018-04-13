import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatModule } from 'chat/chat.module';
import { AuthModule } from 'security/auth.module';
import { UserModule } from 'user/user.module';
import { AppController } from './app.controller';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'chat_server',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
  }), UserModule, ChatModule, AuthModule],
  controllers: [AppController],
  components: [],
})
export class AppModule {
  constructor() {}
}

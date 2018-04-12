import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { UserModule } from 'user/user.module';
import { ChatModule } from 'chat/chat.module';
import { AuthModule } from 'security/auth.module';
import { Connection } from 'typeorm';

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

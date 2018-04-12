import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { UserModule } from 'user/user.module';
import { ChatModule } from 'chat/chat.module';

@Module({
  imports: [TypeOrmModule.forRoot()],
  controllers: [AppController],
  components: [],
  modules: [UserModule, ChatModule],
})
export class AppModule {}

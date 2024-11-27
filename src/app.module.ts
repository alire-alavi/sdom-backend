import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { QuestionModule } from './question/question.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    UserModule,
    QuestionModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

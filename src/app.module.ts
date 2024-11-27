import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { QuestionModule } from './question/question.module';
import { QuestionController } from './question/question.controller';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, UserModule, QuestionModule],
  controllers: [AppController, QuestionController],
  providers: [AppService],
})
export class AppModule {}

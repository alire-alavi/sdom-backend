import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { QuestionService } from './question/question.service';
import { QuestionModule } from './question/question.module';

@Module({
  imports: [AuthModule, QuestionModule],
  controllers: [AppController],
  providers: [AppService, QuestionService],
})
export class AppModule {}

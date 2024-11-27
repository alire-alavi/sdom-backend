import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionRepository } from './question.repository';
import { DynamoDbQuestionRepository } from './dyanmodb-question.repository';
import { QuestionController } from './question.controller';

@Module({
  controllers: [QuestionController],
  providers: [
    QuestionService,
    {
      provide: QuestionRepository,
      useClass: DynamoDbQuestionRepository,
    },
  ],
})
export class QuestionModule {}

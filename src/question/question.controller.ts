import { Body, Controller, Get, Post } from '@nestjs/common';
import { QuestionService } from './question.service';
import { Question } from './question.entity';
import { BatchValidateAnswerDto } from './dto';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questisonService: QuestionService) {}

  @Get('random')
  async getRandomQuestions(): Promise<Question[]> {
    return this.questisonService.getRandomQuestions();
  }

  @Post('validate')
  async validateAnswer(
    @Body() batchValidateAnswer: BatchValidateAnswerDto,
  ): Promise<{ [key: string]: boolean }> {
    return this.questisonService.validateBatchAnswers(batchValidateAnswer);
  }
}

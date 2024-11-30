import { Body, Controller, Get, Post } from '@nestjs/common';
import { QuestionService } from './question.service';
import { Question } from './question.entity';
import { BatchValidateAnswerDto } from './dto';
import { Public } from 'src/decorators/auth.decorator';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questisonService: QuestionService) {}

  @Public()
  @Get('random')
  async getRandomQuestions(): Promise<Question[]> {
    return this.questisonService.getRandomQuestions();
  }

  @Public()
  @Post('validate')
  async validateAnswer(
    @Body() batchValidateAnswer: BatchValidateAnswerDto,
  ): Promise<{ [key: string]: boolean }> {
    return this.questisonService.validateBatchAnswers(batchValidateAnswer);
  }
}

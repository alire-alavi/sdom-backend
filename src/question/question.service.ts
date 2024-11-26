import { Injectable } from '@nestjs/common';
import { QuestionRepository } from './question.repository';
import { Question } from './question.entity';
import { BatchValidateAnswerDto } from './dto';

@Injectable()
export class QuestionService {
  constructor(private readonly questionRepository: QuestionRepository) {}

  async getRandomQuestions(limit: number = 6): Promise<Question[]> {
    return this.questionRepository.findRandom(limit);
  }

  async validateBatchAnswers(
    batchDto: BatchValidateAnswerDto,
  ): Promise<{ [key: string]: boolean }> {
    const results: { [key: string]: boolean } = {};

    for (const answer of batchDto.answers) {
      const question = await this.questionRepository.findOne(answer.questionId);

      if (!question) {
        results[answer.questionId] = false;
        continue;
      }

      const correctChoice = question.choices.find((choice) => choice.isCorrect);
      results[answer.questionId] =
        correctChoice?.value === answer.selectedChoice; // selectedChoice is equal to the value of the choices
    }

    return results;
  }
}

import { Injectable } from '@nestjs/common';
import { QuestionRepository } from './question.repository';
import { Question } from './question.entity';
import { BatchValidateAnswerDto, ValidationResponseDto } from './dto';
import { getRandomElements } from './question.utils';

@Injectable()
export class QuestionService {
  constructor(private readonly questionRepository: QuestionRepository) {}

  async getRandomQuestions(): Promise<Question[]> {
    return getRandomElements(await this.questionRepository.findRandom(), 6);
  }

  async validateBatchAnswers(
    batchDto: BatchValidateAnswerDto,
  ): Promise<ValidationResponseDto> {
    const results: Record<string, boolean> = {};
    const questionIds = batchDto.answers.map((item) => item.questionId);
    const questions = await this.questionRepository.findByListOfID(questionIds);
    let allTure: boolean = true;
    for (const answer of batchDto.answers) {
      const question = questions.find((item) => item.id === answer.questionId);

      if (!question) {
        results[answer.questionId] = false;
        continue;
      }

      const correctChoice = question.correctChoice;
      const isCorrect = correctChoice === answer.selectedChoice;
      if (allTure) {
        // if one answer is not correct
        // the challenge is omitted
        if (!isCorrect) {
          allTure = false;
        }
      }
      results[answer.questionId] = isCorrect;
    }

    // TODO:
    // if (allTure) {
    //   // call OTP for user's
    // }
    return {
      questionsResult: results,
      success: allTure,
      message: allTure ? 'Otp Passed' : 'wrong answers',
    };
  }
}

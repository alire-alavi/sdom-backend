import { Question } from './question.entity';

export abstract class QuestionRepository {
  abstract findAll(): Promise<Question[]>;
  abstract findRandom(limit: number): Promise<Question[]>;
}

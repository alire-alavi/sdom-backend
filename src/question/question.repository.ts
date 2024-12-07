import { Question } from './question.entity';

export abstract class QuestionRepository {
  abstract findAll(): Promise<Question[]>;
  abstract findOne(id: string | number): Promise<Question>;
  abstract findRandom(): Promise<Question[]>;
}

import { Question } from './question.entity';

export class QuestionMapper {
  static toDynamoDBEntity(question: Question): any {
    return {
      QuestionId: question.id.toString(),
      Question: question.question,
      Choices: question.choices,
      correctChoice: question.correctChoice,
    };
  }

  static fromDynamoDBEntity(dynamoQuestion: any): Question {
    const question = new Question();
    (question.id = dynamoQuestion.QuestionId),
      (question.question = dynamoQuestion.Question);
    question.choices = dynamoQuestion.Choices;
    question.correctChoice = dynamoQuestion.CorrectChoice;
    return question;
  }
}

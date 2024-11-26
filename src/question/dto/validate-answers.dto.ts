export class ValidateAnswerDto {
  questionId: number;
  selectedChoice: string;
}

export class BatchValidateAnswerDto {
  answers: ValidateAnswerDto[];
}

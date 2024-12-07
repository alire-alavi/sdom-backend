export class ValidateAnswerDto {
  questionId: string;
  selectedChoice: string;
}

export class BatchValidateAnswerDto {
  answers: ValidateAnswerDto[];
}

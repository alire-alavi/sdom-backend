export class ValidateAnswerDto {
  questionId: string;
  selectedChoice: string;
}

export class BatchValidateAnswerDto {
  answers: ValidateAnswerDto[];
}

export class ValidationResponseDto {
  questionsResult: Record<string, boolean>;
  success: boolean;
  message?: string;
}

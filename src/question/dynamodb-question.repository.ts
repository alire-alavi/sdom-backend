import { Injectable } from '@nestjs/common';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  ScanCommand,
  GetCommand,
} from '@aws-sdk/lib-dynamodb';
import { QuestionRepository } from './question.repository';
import { Question } from './question.entity';

@Injectable()
export class DynamoDbQuestionRepository implements QuestionRepository {
  private readonly client: DynamoDBDocumentClient;
  public QUESTIONS_TALBE: string;

  constructor() {
    const dynamoClient = new DynamoDBClient({ region: process.env.AWS_REGION });

    this.QUESTIONS_TALBE = process.env.QUESTIONS_TALBE;

    this.client = DynamoDBDocumentClient.from(dynamoClient);
  }

  async findAll(): Promise<Question[]> {
    const command = new ScanCommand({
      TableName: 'Questions',
    });

    const result = await this.client.send(command);
    return result.Items as Question[];
  }

  async findRandom(limit: number): Promise<Question[]> {
    const command = new ScanCommand({
      TableName: this.QUESTIONS_TALBE,
    });

    const result = await this.client.send(command);
    return result.Items as Question[];
  }

  async findOne(id: number): Promise<Question | null> {
    const command = new GetCommand({
      TableName: this.QUESTIONS_TALBE,
      Key: {
        id,
      },
    });

    const result = await this.client.send(command);
    return (result.Item as Question) || null;
  }
}

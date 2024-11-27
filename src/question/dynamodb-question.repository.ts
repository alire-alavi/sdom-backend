import { Injectable } from '@nestjs/common';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  ScanCommand,
  GetCommand,
  PutCommand,
} from '@aws-sdk/lib-dynamodb';
import { QuestionRepository } from './question.repository';
import { Question } from './question.entity';

@Injectable()
export class DynamoDbQuestionRepository implements QuestionRepository {
  private readonly client: DynamoDBDocumentClient;

  constructor() {
    const dynamoClient = new DynamoDBClient({ region: 'me-central-1' });
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
      TableName: 'Questions',
    });

    const result = await this.client.send(command);
    return result.Items as Question[];
  }

  async findOne(id: number): Promise<Question | null> {
    const command = new GetCommand({
      TableName: 'Questions',
      Key: {
        id,
      },
    });

    const result = await this.client.send(command);
    return (result.Item as Question) || null;
  }
}

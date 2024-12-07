import { Injectable } from '@nestjs/common';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  ScanCommand,
  GetCommand,
} from '@aws-sdk/lib-dynamodb';
import { ConfigService } from '@nestjs/config';
import { QuestionRepository } from './question.repository';
import { Question } from './question.entity';
import { fromIni } from '@aws-sdk/credential-providers';

@Injectable()
export class DynamoDbQuestionRepository implements QuestionRepository {
  private readonly client: DynamoDBDocumentClient;
  private readonly tableName: string;

  constructor(private readonly configService: ConfigService) {
    let dynamoClient: DynamoDBClient;
    if (this.configService.get<string>('LOCAL_TEST')) {
      dynamoClient = new DynamoDBClient({
        region: process.env.AWS_REGION,
        credentials: fromIni({ profile: 'sdom' }),
      });
    } else {
      dynamoClient = new DynamoDBClient({
        region: process.env.AWS_REGION,
      });
    }

    this.tableName = this.configService.get<string>('QUESTIONS_TABLE');

    this.client = DynamoDBDocumentClient.from(dynamoClient);
  }

  async findAll(): Promise<Question[]> {
    const command = new ScanCommand({
      TableName: this.tableName,
    });

    const result = await this.client.send(command);
    return result.Items as Question[];
  }

  // TODO: define finde batch by id

  async findRandom(): Promise<Question[]> {
    const command = new ScanCommand({
      TableName: this.tableName,
      ProjectionExpression: 'QuestionId, Question, Choices',
    });

    const result = await this.client.send(command);
    return result.Items as Question[];
  }

  async findOne(id: number): Promise<Question | null> {
    const command = new GetCommand({
      TableName: this.tableName,
      Key: {
        id,
      },
    });

    const result = await this.client.send(command);
    return (result.Item as Question) || null;
  }
}

import { Injectable } from '@nestjs/common';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  ScanCommand,
  GetCommand,
  BatchGetCommand,
  BatchGetCommandInput,
} from '@aws-sdk/lib-dynamodb';
import { ConfigService } from '@nestjs/config';
import { QuestionRepository } from './question.repository';
import { Question } from './question.entity';
import { QuestionMapper } from './question.mapper';
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
    return result.Items.map((entity) =>
      QuestionMapper.fromDynamoDBEntity(entity),
    );
  }

  async findRandom(): Promise<Question[]> {
    const command = new ScanCommand({
      TableName: this.tableName,
      ProjectionExpression: 'QuestionId, Question, Choices',
    });

    const result = await this.client.send(command);
    return result.Items.map((entity) =>
      QuestionMapper.fromDynamoDBEntity(entity),
    );
  }

  async findByListOfID(IDList: string[]): Promise<Question[]> {
    const keys: Record<string, string>[] = IDList.map((ID) => ({
      QuestionId: ID,
    }));
    const commandInput: BatchGetCommandInput = {
      RequestItems: {
        [this.tableName]: {
          Keys: keys,
        },
      },
    };
    const command = new BatchGetCommand(commandInput);
    const result = await this.client.send(command);
    const items = result.Responses?.[this.tableName] || [];
    return items.map((entity) => QuestionMapper.fromDynamoDBEntity(entity));
  }

  async findOne(id: number): Promise<Question | null> {
    const command = new GetCommand({
      TableName: this.tableName,
      Key: {
        id,
      },
    });

    const result = await this.client.send(command);
    return result.Item
      ? (QuestionMapper.fromDynamoDBEntity(result.Item) as Question)
      : null;
  }
}

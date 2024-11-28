import { Injectable } from '@nestjs/common';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  ScanCommand,
  GetCommand,
  PutCommand,
} from '@aws-sdk/lib-dynamodb';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { UserMapper } from './user.mapper';
import { fromIni } from '@aws-sdk/credential-providers';

@Injectable()
export class DynamoDbUserRepository implements UserRepository {
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
    this.tableName = this.configService.get<string>('USERS_TABLE');

    this.client = DynamoDBDocumentClient.from(dynamoClient);
  }

  async findAll(): Promise<User[]> {
    const command = new ScanCommand({
      TableName: this.tableName,
    });

    const result = await this.client.send(command);
    return result.Items.map((entity) => UserMapper.fromDynamoDBEntity(entity));
  }

  async findById(id: number): Promise<User | null> {
    const command = new GetCommand({
      TableName: this.tableName,
      Key: {
        id,
      },
    });

    const result = await this.client.send(command);
    return result.Item
      ? (UserMapper.fromDynamoDBEntity(result.Item) as User)
      : null;
  }

  async save(user: User): Promise<User> {
    const command = new PutCommand({
      TableName: this.tableName,
      Item: user,
    });

    await this.client.send(command);
    return user;
  }
}

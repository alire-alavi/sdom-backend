import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand, GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';

@Injectable()
export class DynamoDbUserRepository implements UserRepository {
  private readonly client: DynamoDBDocumentClient;

  constructor() {
    const dynamoClient = new DynamoDBClient({ region: 'your-region' });
    this.client = DynamoDBDocumentClient.from(dynamoClient);
  }

  async findAll(): Promise<User[]> {
    const command = new ScanCommand({
      TableName: 'Users',
    });

    const result = await this.client.send(command);
    return result.Items as User[];
  }

  async findById(id: number): Promise<User | null> {
    const command = new GetCommand({
      TableName: 'Users',
      Key: {
        id,
      },
    });

    const result = await this.client.send(command);
    return result.Item as User || null;
  }

  async save(user: User): Promise<User> {
    const command = new PutCommand({
      TableName: 'Users',
      Item: user,
    });

    await this.client.send(command);
    return user;
  }
}

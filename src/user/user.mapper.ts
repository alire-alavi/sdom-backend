import { User } from './user.entity';

export class UserMapper {
  static toDynamoDBEntity(user: User): any {
    return {
      UserId: user.id.toString(),
      Email: user.email,
      Name: user.name,
      Phone: user.phone,
    };
  }

  static fromDynamoDBEntity(dynamoUser: any): User {
    const user = new User();
    (user.id = dynamoUser.UserId), (user.email = dynamoUser.Email);
    user.name = dynamoUser.Name;
    user.phone = dynamoUser.Phone;
    return user;
  }
}

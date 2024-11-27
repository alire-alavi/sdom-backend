import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { DynamoDbUserRepository } from './dynamodb-user.repository';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: UserRepository,
      useClass: DynamoDbUserRepository,
    },
  ],
  exports: [UserService, UserRepository],
})
export class UserModule {}

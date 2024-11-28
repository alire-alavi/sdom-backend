import { User } from './user.entity';

export abstract class UserRepository {
  abstract findAll(): Promise<User[]>;
  abstract findById(id: string): Promise<User | null>;
  abstract save(user: User): Promise<User>;
}

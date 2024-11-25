import { User } from './user.entity';

export abstract class UserRepository {
  abstract findAll(): Promise<User[]>;
  abstract findById(id: number): Promise<User | null>;
  abstract save(user: User): Promise<User>;
}

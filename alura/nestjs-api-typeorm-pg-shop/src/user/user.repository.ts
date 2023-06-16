import { UserEntity } from './entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  private users: UserEntity[] = [];

  async create(user: UserEntity): Promise<void> {
    await this.users.push(user);
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.users;
  }

  async findOne(id: string): Promise<UserEntity> {
    return await this.users.find((user) => user.id === id);
  }

  async findOneByUsername(username: string): Promise<UserEntity> {
    return await this.users.find((user) => user.username === username);
  }

  async update(id: string, data: Partial<UserEntity>): Promise<void> {
    const userToUpdate = await this.users.find((user) => user.id === id);

    if (!userToUpdate) {
      throw new Error('User not found');
    }

    Object.entries(data).forEach(([key, value]) => (userToUpdate[key] = value));
  }

  async delete(id: string): Promise<void> {
    const userToDelete = await this.findOne(id);

    this.users = this.users.filter((user) => user.id != userToDelete.id);
  }
}

import { UpdateUserDTO } from './dtos/update-user.dto';
import { CreateUserDTO } from './dtos/create-user.dto';
import { FindUserDTO } from './dtos/find-user.dto';
import { UserEntity } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(data: CreateUserDTO): Promise<void> {
    await this.userRepository.save({
      ...data,
    });
  }

  async findAll(): Promise<FindUserDTO[]> {
    const users = await this.userRepository.find();
    return users.map(
      (user) => new FindUserDTO(user.id, user.name, user.username),
    );
  }

  async findOne(id: string): Promise<FindUserDTO> {
    const user = await this.userRepository.findOne({ where: { id } });
    return new FindUserDTO(user.id, user.name, user.username);
  }

  async findOneByUsername(username: string): Promise<FindUserDTO> {
    const user = await this.userRepository.findOneBy({ username });

    if (user) {
      return new FindUserDTO(user.id, user.name, user.username);
    }
  }

  async update(id: string, data: UpdateUserDTO): Promise<void> {
    await this.userRepository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}

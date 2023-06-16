import { UserService } from './user.service';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { FindUserDTO } from './dtos/find-user.dto';
import { UserEntity } from './entities/user.entity';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UserRepository } from './user.repository';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';

@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async create(@Body() user: CreateUserDTO): Promise<void> {
    await this.userService.create(user);
  }

  @Get()
  async findAll(): Promise<FindUserDTO[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<FindUserDTO> {
    return await this.userService.findOne(id);
  }

  @Get('/username/:username')
  async findOneByUsername(
    @Param('username') username: string,
  ): Promise<FindUserDTO> {
    const user = await this.userService.findOneByUsername(username);
    if (user) {
      return new FindUserDTO(user.id, user.name, user.username);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() user: UpdateUserDTO,
  ): Promise<void> {
    const userEntity: UserEntity = {
      ...user,
      updatedAt: new Date(),
    };

    await this.userService.update(id, userEntity);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.userService.delete(id);
  }
}

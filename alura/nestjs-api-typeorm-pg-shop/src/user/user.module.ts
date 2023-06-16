import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsernameIsUniqueValidator } from './validation/username-is-unique.validator';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserRepository, UsernameIsUniqueValidator, UserService],
})
export class UserModule {}

import { IsOptional } from 'class-validator';
import { CreateUserDTO } from './create-user.dto';

export class UpdateUserDTO extends CreateUserDTO {
  @IsOptional()
  name: string;

  @IsOptional()
  username: string;

  @IsOptional()
  password: string;
}

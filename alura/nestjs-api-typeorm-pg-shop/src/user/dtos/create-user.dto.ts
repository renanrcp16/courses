import { IsAlpha, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { UsernameIsUnique } from '../validation/username-is-unique.validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty({ message: "campo 'name' não pode ser vazio" })
  name: string;

  @IsString()
  @IsNotEmpty({ message: "campo 'username' não pode ser vazio" })
  @IsAlpha(undefined, { message: "campo 'username' deve conter apenas letras" })
  @MinLength(3, {
    message: "campo 'username' precisa ter ao menos 3 caractéres",
  })
  @UsernameIsUnique({ message: "valor do campo 'username' já está em uso" })
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, {
    message: "campo 'password' precisa ter ao menos 6 caractéres",
  })
  password: string;
}

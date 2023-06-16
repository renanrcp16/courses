import { UserService } from './../user.service';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';

@Injectable()
@ValidatorConstraint({ async: true })
export class UsernameIsUniqueValidator implements ValidatorConstraintInterface {
  constructor(private userService: UserService) {}

  async validate(username: string): Promise<boolean> {
    const usernameAlreadyUsed = await this.userService.findOneByUsername(
      username,
    );
    return usernameAlreadyUsed ? false : true;
  }
}

export const UsernameIsUnique = (validationOptions: ValidationOptions) => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: UsernameIsUniqueValidator,
    });
  };
};

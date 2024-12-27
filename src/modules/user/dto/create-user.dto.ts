import { IsEmail, IsStrongPassword } from 'class-validator';
import { validatePassword } from '@/utils/password-validator';

export class CreateUserDTO {
  @IsEmail({}, { message: 'O campo "email" deve ser um e-mail válido' })
  email: string;

  @IsStrongPassword(
    {
      minLength: 3,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1,
    },
    {
      message(validationArguments) {
        return validatePassword(validationArguments.value);
      },
    },
  )
  password: string;
}

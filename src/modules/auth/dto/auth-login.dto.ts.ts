import {
  IsAlphanumeric,
  IsEmail,
  IsEmpty,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class AuthLoginDTO {
  @IsEmail()
  @IsEmpty({ message: 'O campo "email" é obrigatório' })
  @IsString({ message: 'O campo "email" deve ser uma string' })
  email: string;

  @IsEmpty({ message: 'O campo "password" é obrigatório' })
  @MinLength(8, { message: 'A senha deve conter pelo menos 8 caracteres' })
  @IsAlphanumeric('pt-BR', { message: 'A senha deve conter letras e numeros' })
  password: string;

  @IsUUID()
  google_id: string;
}

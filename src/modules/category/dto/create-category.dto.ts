import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCategoryDTO {
  @IsString({ message: 'O campo "name" deve ser uma string' })
  @MinLength(2, { message: 'O campo "name" deve conter mais que 2 caracteres' })
  @MaxLength(150, {
    message: 'O campo "name" deve ter no máximo 150 caracteres',
  })
  name: string;

  @IsString({ message: 'O campo "description" deve ser uma string' })
  @MinLength(2, {
    message: 'O campo "description" deve conter mais que 2 caracteres',
  })
  @MaxLength(200, {
    message: 'O campo "description" deve ter no máximo 200 caracteres',
  })
  description: string;
}

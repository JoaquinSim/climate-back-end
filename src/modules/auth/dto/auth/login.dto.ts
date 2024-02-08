import { IsNotEmpty, IsString } from 'class-validator';
import { isNotEmptyValidationOptions, isStringValidationOptions } from 'src/shared/validation/validation';

export class LoginDto {
  @IsString(isStringValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  email: string;

  @IsString(isStringValidationOptions())
  @IsNotEmpty()
  password: string;
}
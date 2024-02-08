import { IsString, IsBoolean, IsOptional, IsNotEmpty, MinLength, IsEmail, MaxLength, ArrayUnique  } from 'class-validator';
import {
  isBooleanValidationOptions,
  isEmailValidationOptions,
  isNotEmptyValidationOptions,
  isStringValidationOptions,
  maxLengthValidationOptions,
  minLengthValidationOptions,
} from 'src/shared/validation/validation';

export class UserDto {
  @IsOptional()
  id: string

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsEmail({}, isEmailValidationOptions())
  @MaxLength(150, maxLengthValidationOptions())
  email: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  lastname: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString()
  @MinLength(8, minLengthValidationOptions())
  @MaxLength(32, minLengthValidationOptions())
  password: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  name: string;
}
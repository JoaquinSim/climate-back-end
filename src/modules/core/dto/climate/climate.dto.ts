import { IsString, IsBoolean, IsOptional, IsNotEmpty, MinLength, IsEmail, MaxLength, ArrayUnique  } from 'class-validator';
import {
  isBooleanValidationOptions,
  isEmailValidationOptions,
  isNotEmptyValidationOptions,
  isStringValidationOptions,
  maxLengthValidationOptions,
  minLengthValidationOptions,
} from 'src/shared/validation/validation';

export class ClimateDto {
  @IsOptional()
  id: string

  @IsNotEmpty(isNotEmptyValidationOptions())
  city: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  temperature: number;

  @IsOptional()
  volumen?: number;

  @IsOptional()
  pressure?: number;

  @IsNotEmpty(isNotEmptyValidationOptions())
  time: Date;

  @IsNotEmpty(isNotEmptyValidationOptions())
  humidity: number;

  @IsNotEmpty(isNotEmptyValidationOptions())
  velocity: number;
}
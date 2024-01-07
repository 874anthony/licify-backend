/* eslint-disable prettier/prettier */
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRole } from 'src/shared/interfaces/users.interface';

export class SignUpDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @MaxLength(20)
  @MinLength(3)
  businessName: string;

  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsOptional()
  avatar: string;
}

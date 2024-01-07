/* eslint-disable prettier/prettier */
import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { UserRole } from 'src/shared/interfaces/users.interface';

export class UpdateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;

  @IsNotEmpty()
  businessName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  avatar: string;
}

/* eslint-disable prettier/prettier */
import { IsEmail, IsEnum, IsOptional } from 'class-validator';
import { UserRole } from 'src/shared/interfaces/users.interface';

export class UpdateUserDto {
  @IsOptional()
  name: string;

  @IsOptional()
  @IsEnum(UserRole)
  role: UserRole;

  @IsOptional()
  businessName: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  avatar: string;
}

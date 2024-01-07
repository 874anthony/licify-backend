import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';
import {
  IsArray,
  IsDate,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @IsOptional()
  name: string;

  @IsDate()
  @IsOptional()
  startDate: Date;

  @IsDate()
  @IsOptional()
  endDate: Date;

  @IsOptional()
  @IsArray()
  items: string[];

  @IsOptional()
  @IsNumber()
  @IsPositive()
  price: number;

  @IsOptional()
  constructorClient: string;

  @IsOptional()
  provider: string;

  @IsOptional()
  description: string;

  @IsOptional()
  @IsArray()
  images: string[];
}

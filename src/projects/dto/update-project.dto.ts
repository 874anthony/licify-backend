import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';
import { IsArray, IsOptional } from 'class-validator';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @IsOptional()
  name: string;

  @IsOptional()
  startDate: Date;

  @IsOptional()
  endDate: Date;

  @IsOptional()
  @IsArray()
  items: string[];

  @IsOptional()
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

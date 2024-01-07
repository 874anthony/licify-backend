import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  name: string;

  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;

  @IsNotEmpty()
  @IsArray()
  items: string[];

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;

  @IsNotEmpty()
  constructorClient: string;

  @IsOptional()
  provider: string;

  @IsOptional()
  description: string;

  @IsOptional()
  @IsArray()
  images: string[];
}

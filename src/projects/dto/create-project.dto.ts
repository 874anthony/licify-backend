import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  startDate: Date;

  @IsNotEmpty()
  endDate: Date;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  constructorClient: string;

  @IsOptional()
  @IsArray()
  items: string[];

  @IsOptional()
  provider: string;

  @IsOptional()
  description: string;

  @IsOptional()
  @IsArray()
  images: string[];
}

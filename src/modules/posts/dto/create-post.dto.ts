import { BodyPartEnum } from '@/types/body-part.enum';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePostDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsString()
  content: string;

  @IsArray()
  imageUrl: string[];

  @IsArray()
  bodyPart: BodyPartEnum[];

  @IsNumber()
  duration: number;

  @IsBoolean()
  @IsOptional()
  isPublic: boolean = false;

  @IsDate()
  createdAt: Date = new Date();

  @IsDate()
  updatedAt: Date = new Date();
}

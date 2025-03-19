import { BodyPartEnum } from '@/types/body-part.enum';
import {
  IsArray,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePostDto {
  // temporary
  @IsString()
  userUuid: string;

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

  @IsDate()
  createdAt: Date = new Date();

  @IsDate()
  updatedAt: Date = new Date();
}

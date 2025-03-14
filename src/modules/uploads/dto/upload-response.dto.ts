import { IsString } from 'class-validator';

export class UploadResponseDto {
  @IsString()
  message: string;
  @IsString()
  imageUrl: string;
}

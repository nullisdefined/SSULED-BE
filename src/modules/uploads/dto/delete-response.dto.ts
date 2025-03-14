import { IsString } from 'class-validator';

export class DeleteResponseDto {
  @IsString()
  message: string;
}

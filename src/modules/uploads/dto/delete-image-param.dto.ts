import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteImageParamDto {
  @IsNotEmpty()
  @IsString()
  ImageUrl: string;
}

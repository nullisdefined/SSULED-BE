import { IsOptional, IsString } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  newNickname?: string;

  @IsOptional()
  @IsString()
  newIntroduction?: string;

  @IsOptional()
  @IsString()
  newProfileImg?: string;
}

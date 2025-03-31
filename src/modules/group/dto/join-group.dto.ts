import { IsOptional, IsString } from 'class-validator';

export class JoinGroupDto {
  @IsString()
  @IsOptional()
  password?: string;
}

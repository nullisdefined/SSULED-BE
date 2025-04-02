import { IsNotEmpty, IsString } from 'class-validator';

export class DevLoginDto {
  @IsString()
  @IsNotEmpty()
  userUuid: string;
}

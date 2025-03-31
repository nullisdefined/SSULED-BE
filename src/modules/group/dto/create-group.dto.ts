import { IsBoolean, IsDate, IsNumber } from 'class-validator';

import { IsOptional } from 'class-validator';

import { IsNotEmpty } from 'class-validator';

import { IsString } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsBoolean()
  @IsOptional()
  isAccessible?: boolean;

  @IsNumber()
  @IsOptional()
  maxMember?: number;

  @IsDate()
  createdAt: Date = new Date();

  @IsDate()
  updatedAt: Date = new Date();
}

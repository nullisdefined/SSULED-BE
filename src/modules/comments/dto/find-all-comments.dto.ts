import { Type } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';

export class FindAllCommentsDto {
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  page: number = 1;

  @IsNumber()
  @Type(() => Number)
  @Min(1)
  limit: number = 10;
}

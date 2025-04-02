import { Controller, UseGuards } from '@nestjs/common';
import { S3Service } from './s3.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';

@ApiTags('s3')
@ApiBearerAuth('JWT-auth')
@Controller('s3')
@UseGuards(JwtAuthGuard)
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}
}

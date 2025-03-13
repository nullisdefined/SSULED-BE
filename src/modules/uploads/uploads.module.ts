import { Module } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { UploadsController } from './uploads.controller';
import { ConfigModule } from '@nestjs/config';
import { S3Service } from '../s3/s3.service';
@Module({
  imports: [ConfigModule],
  controllers: [UploadsController],
  providers: [UploadsService, S3Service],
})
export class UploadsModule {}

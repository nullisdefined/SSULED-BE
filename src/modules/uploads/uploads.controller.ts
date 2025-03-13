import {
  BadRequestException,
  Controller,
  Delete,
  Inject,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { Logger } from 'winston';
import { S3Service } from '../s3/s3.service';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiConsumes,
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('uploads')
@Controller('uploads')
export class UploadsController {
  constructor(
    private readonly uploadsService: UploadsService,
    @Inject('winston')
    private readonly logger: Logger,
    private readonly s3Service: S3Service,
  ) {}

  @Post('image')
  @ApiOperation({
    summary: '이미지 업로드',
    description: '이미지 파일을 S3에 업로드합니다.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
          description: '업로드할 이미지 파일 (jpg, jpeg, png, gif만 가능)',
        },
      },
      required: ['image'],
    },
  })
  @UseInterceptors(
    FileInterceptor('image', {
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/^image\/(jpg|jpeg|png|gif)$/)) {
          return cb(
            new BadRequestException(
              '이미지 파일만 업로드 가능합니다. (jpg, jpeg, png, gif)',
            ),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('이미지 파일을 제공해주세요.');
    }

    try {
      const imageUrl = await this.s3Service.uploadImage(file);
      return {
        success: true,
        message: '이미지 업로드 성공',
        data: {
          imageUrl,
        },
      };
    } catch (error) {
      throw new BadRequestException(`이미지 업로드 실패: ${error.message}`);
    }
  }

  @Delete('image/:url')
  @ApiOperation({
    summary: '이미지 삭제',
    description: '업로드된 이미지를 S3에서 삭제합니다.',
  })
  @ApiParam({
    name: 'url',
    type: 'string',
    description: '삭제할 이미지 URL',
    required: true,
  })
  async deleteImage(@Param('id') imageUrl: string) {
    try {
      await this.s3Service.deleteImage(imageUrl);
      return {
        success: true,
        message: '이미지 삭제 성공',
      };
    } catch (error) {
      throw new BadRequestException(`이미지 삭제 실패: ${error.message}`);
    }
  }
}

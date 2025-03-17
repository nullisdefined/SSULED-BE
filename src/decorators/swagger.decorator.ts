import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

export function ApiUploadImage() {
  return applyDecorators(
    ApiOperation({
      summary: '이미지 업로드',
      description: 'S3 Bucket에 이미지 파일을 업로드합니다.',
    }),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          image: {
            type: 'string',
            format: 'binary',
            description: '업로드할 이미지 파일 (jpg, jpeg, png, gif만 가능)',
          },
        },
      },
    }),
    ApiResponse({
      status: 201,
      description: '이미지가 성공적으로 업로드됨',
      schema: {
        type: 'object',
        properties: {
          imageUrl: {
            type: 'string',
            example:
              'https://example-bucket.s3.amazonaws.com/images/example-image.jpg',
          },
          message: {
            type: 'string',
            example: '이미지가 업로드되었습니다.',
          },
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: '잘못된 요청',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: '이미지 업로드 실패: The bucket does not allow ACLs',
          },
          error: {
            type: 'string',
            example: 'Bad Request',
          },
          statusCode: {
            type: 'number',
            example: 400,
          },
        },
      },
    }),
  );
}

export function ApiDeleteImage() {
  return applyDecorators(
    ApiOperation({
      summary: '이미지 삭제',
      description: '업로드된 이미지를 S3에서 삭제합니다.',
    }),
    ApiParam({
      name: 'url',
      description: '삭제할 이미지 URL',
      required: true,
    }),
    ApiResponse({
      status: 200,
      description: '이미지가 성공적으로 삭제됨',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: '이미지가 삭제되었습니다.',
          },
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: '잘못된 요청',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: '이미지 삭제 실패: The specified key does not exist',
          },
          error: {
            type: 'string',
            example: 'Bad Request',
          },
          statusCode: {
            type: 'number',
            example: 400,
          },
        },
      },
    }),
  );
}

import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { BodyPartEnum } from '../types/body-part.enum';

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
              'https://ssuled-bucket.s3.amazonaws.com/images/example-image.jpg',
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

export function ApiCreatePost() {
  return applyDecorators(
    ApiOperation({
      summary: '게시글 생성',
      description: '새로운 게시글을 생성합니다.',
    }),
    ApiBody({
      schema: {
        type: 'object',
        required: ['userUuid', 'content'],
        properties: {
          userUuid: {
            type: 'string',
            description: '조회할 사용자 UUID',
            example: '123e4567-e89b-12d3-a456-426614174000',
          },
          content: {
            type: 'string',
            description: '게시글 내용',
            example: '처음으로 헬스장에 가봤는데 너무 좋았어요!',
          },
          imageUrl: {
            type: 'array',
            items: {
              type: 'string',
            },
            description: '게시글 이미지 URL 배열',
            example: [
              'https://ssuled-bucket.s3.amazonaws.com/images/example-image1.jpg',
            ],
          },
          bodyPart: {
            type: 'array',
            items: {
              type: 'string',
              enum: Object.values(BodyPartEnum),
            },
            description: '운동한 신체부위 배열',
            example: [
              BodyPartEnum.CHEST,
              BodyPartEnum.SHOULDERS_ARMS,
              BodyPartEnum.BACK,
            ],
          },
          duration: {
            type: 'number',
            description: '운동한 시간 (분 단위)',
            example: 90,
          },
        },
      },
    }),
    ApiResponse({
      status: 201,
      description: '게시글이 성공적으로 생성됨',
      schema: {
        type: 'object',
        properties: {
          userUuid: {
            type: 'string',
            example: '123e4567-e89b-12d3-a456-426614174000',
          },
          content: {
            type: 'string',
            example: '처음으로 헬스장에 가봤는데 너무 좋았어요!',
          },
          imageUrl: {
            type: 'array',
            items: {
              type: 'string',
            },
            example: [
              'https://ssuled-bucket.s3.amazonaws.com/images/example-image1.jpg',
            ],
          },
          bodyPart: {
            type: 'array',
            items: {
              type: 'string',
              enum: Object.values(BodyPartEnum),
            },
            example: [
              BodyPartEnum.CHEST,
              BodyPartEnum.SHOULDERS_ARMS,
              BodyPartEnum.BACK,
            ],
          },
          duration: {
            type: 'number',
            example: 90,
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-03-19T10:41:07.528Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-03-19T10:41:07.528Z',
          },
          title: {
            type: 'string',
            nullable: true,
            example: null,
          },
          id: {
            type: 'number',
            example: 6,
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
            type: 'array',
            example: [
              'content should not be empty',
              'userUuid must be a UUID format',
            ],
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

export function ApiGetAllPosts() {
  return applyDecorators(
    ApiOperation({
      summary: '모든 게시글 조회',
      description: '모든 게시글 목록을 조회합니다.',
    }),
    ApiQuery({
      name: 'page',
      required: false,
      description: '페이지 번호 (default: 1)',
      type: 'number',
      example: 1,
    }),
    ApiQuery({
      name: 'limit',
      required: false,
      description: '페이지당 게시글 수 (default: 24)',
      type: 'number',
      example: 24,
    }),
    ApiQuery({
      name: 'userUuid',
      required: false,
      description: '사용자 UUID (임시)',
      type: 'string',
      example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    ApiResponse({
      status: 200,
      description: '게시글 목록 조회 성공',
      schema: {
        type: 'object',
        properties: {
          data: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {
                  type: 'number',
                  example: 1,
                },
                content: {
                  type: 'string',
                  example: '처음으로 헬스장에 가봤는데 너무 좋았어요!',
                },
                imageUrl: {
                  type: 'array',
                  items: {
                    type: 'string',
                  },
                  example: [
                    'https://ssuled-bucket.s3.amazonaws.com/images/example-image1.jpg',
                  ],
                },
                bodyPart: {
                  type: 'array',
                  items: {
                    type: 'string',
                    enum: Object.values(BodyPartEnum),
                  },
                  example: [
                    BodyPartEnum.CHEST,
                    BodyPartEnum.SHOULDERS_ARMS,
                    BodyPartEnum.BACK,
                  ],
                },
                duration: {
                  type: 'number',
                  example: 90,
                },
                createdAt: {
                  type: 'string',
                  format: 'date-time',
                  example: '2025-03-17T09:00:00.000Z',
                },
                updatedAt: {
                  type: 'string',
                  format: 'date-time',
                  example: '2025-03-19T09:00:00.000Z',
                },
                likeCount: {
                  type: 'number',
                  example: 15,
                  description: '좋아요 수',
                },
                commentCount: {
                  type: 'number',
                  example: 5,
                  description: '댓글 수',
                },
              },
            },
          },
          meta: {
            type: 'object',
            properties: {
              totalItems: {
                type: 'number',
                example: 100,
              },
              itemsPerPage: {
                type: 'number',
                example: 24,
              },
              totalPages: {
                type: 'number',
                example: 5,
              },
              currentPage: {
                type: 'number',
                example: 1,
              },
            },
          },
        },
      },
    }),
  );
}

export function ApiGetPostById() {
  return applyDecorators(
    ApiOperation({
      summary: '게시글 상세 조회',
      description: '특정 ID의 게시글을 조회합니다.',
    }),
    ApiParam({
      name: 'postId',
      description: '조회할 게시글 ID',
      required: true,
      type: 'string',
    }),
    ApiResponse({
      status: 200,
      description: '게시글 조회 성공',
      schema: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
            example: 1,
          },
          content: {
            type: 'string',
            example: '처음으로 헬스장에 가봤는데 너무 좋았어요!',
          },
          imageUrl: {
            type: 'array',
            items: {
              type: 'string',
            },
            example: [
              'https://ssuled-bucket.s3.amazonaws.com/images/example-image1.jpg',
            ],
          },
          bodyPart: {
            type: 'array',
            items: {
              type: 'string',
              enum: Object.values(BodyPartEnum),
            },
            example: [
              BodyPartEnum.CHEST,
              BodyPartEnum.SHOULDERS_ARMS,
              BodyPartEnum.BACK,
            ],
          },
          duration: {
            type: 'number',
            example: 90,
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-03-17T09:00:00.000Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-03-19T09:00:00.000Z',
          },
          likeCount: {
            type: 'number',
            example: 15,
            description: '좋아요 수',
          },
          comments: {
            type: 'array',
            description: '댓글 목록',
            items: {
              type: 'object',
              properties: {
                id: {
                  type: 'number',
                  example: 1,
                },
                content: {
                  type: 'string',
                  example: '오운완 좋아요!',
                },
                userUuid: {
                  type: 'string',
                  example: '123e4567-e89b-12d3-a456-426614174001',
                },
                userName: {
                  type: 'string',
                  example: '재굴TV',
                },
                userProfileImage: {
                  type: 'string',
                  example:
                    'https://ssuled-bucket.s3.amazonaws.com/profiles/user1.jpg',
                },
                createdAt: {
                  type: 'string',
                  format: 'date-time',
                  example: '2025-03-18T10:00:00.000Z',
                },
                updatedAt: {
                  type: 'string',
                  format: 'date-time',
                  example: '2025-03-18T10:00:00.000Z',
                },
              },
            },
          },
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: '게시글을 찾을 수 없음',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: '해당 ID의 게시글을 찾을 수 없습니다.',
          },
          error: {
            type: 'string',
            example: 'Not Found',
          },
          statusCode: {
            type: 'number',
            example: 404,
          },
        },
      },
    }),
  );
}

export function ApiUpdatePost() {
  return applyDecorators(
    ApiOperation({
      summary: '게시글 수정',
      description: '특정 ID의 게시글을 수정합니다.',
    }),
    ApiParam({
      name: 'postId',
      description: '수정할 게시글 ID',
      required: true,
      type: 'string',
    }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          content: {
            type: 'string',
            description: '게시글 내용',
            example: '처음으로 헬스장에 가봤는데 너무 좋았어요! 오운완! 😎',
          },
          imageUrl: {
            type: 'array',
            items: {
              type: 'string',
            },
            description: '게시글 이미지 URL 배열',
            example: [
              'https://ssuled-bucket.s3.amazonaws.com/images/updated-image1.jpg',
            ],
          },
          bodyPart: {
            type: 'array',
            items: {
              type: 'string',
              enum: Object.values(BodyPartEnum),
            },
            description: '운동한 신체부위 배열',
            example: [
              BodyPartEnum.CHEST,
              BodyPartEnum.SHOULDERS_ARMS,
              BodyPartEnum.CORE,
            ],
          },
          duration: {
            type: 'number',
            description: '운동한 시간 (분 단위)',
            example: 120,
          },
        },
      },
    }),
    ApiResponse({
      status: 200,
      description: '게시글이 성공적으로 수정됨',
      schema: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
            example: 1,
          },
          content: {
            type: 'string',
            example: '처음으로 헬스장에 가봤는데 너무 좋았어요! 오운완! 😎',
          },
          imageUrl: {
            type: 'array',
            items: {
              type: 'string',
            },
            example: [
              'https://ssuled-bucket.s3.amazonaws.com/images/updated-image1.jpg',
            ],
          },
          bodyPart: {
            type: 'array',
            items: {
              type: 'string',
              enum: Object.values(BodyPartEnum),
            },
            example: [
              BodyPartEnum.CHEST,
              BodyPartEnum.SHOULDERS_ARMS,
              BodyPartEnum.CORE,
            ],
          },
          duration: {
            type: 'number',
            example: 120,
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-03-19T10:30:00.000Z',
          },
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: '게시글을 찾을 수 없음',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: '해당 ID의 게시글을 찾을 수 없습니다.',
          },
          error: {
            type: 'string',
            example: 'Not Found',
          },
          statusCode: {
            type: 'number',
            example: 404,
          },
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: 'Validation 오류',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'array',
            example: ['content must be a string', 'imageUrl must be an array'],
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

export function ApiDeletePost() {
  return applyDecorators(
    ApiOperation({
      summary: '게시글 삭제',
      description: '특정 ID의 게시글을 삭제합니다.',
    }),
    ApiParam({
      name: 'postId',
      description: '삭제할 게시글 ID',
      required: true,
      type: 'string',
    }),
    ApiResponse({
      status: 200,
      description: '게시글이 성공적으로 삭제됨',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: '게시글이 성공적으로 삭제되었습니다.',
          },
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: '게시글을 찾을 수 없음',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: '해당 ID의 게시글을 찾을 수 없습니다.',
          },
          error: {
            type: 'string',
            example: 'Not Found',
          },
          statusCode: {
            type: 'number',
            example: 404,
          },
        },
      },
    }),
  );
}

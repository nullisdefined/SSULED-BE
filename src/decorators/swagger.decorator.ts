import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiQuery,
  ApiBearerAuth,
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
        required: ['content'],
        properties: {
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
          isPublic: {
            type: 'boolean',
            description: '게시글 공개 여부',
            example: true,
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
          isPublic: {
            type: 'boolean',
            example: true,
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
            example: ['content should not be empty'],
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
      summary: '사용자 게시글 조회',
      description: '한 사용자의 모든 게시글 목록을 조회합니다.',
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
                isPublic: {
                  type: 'boolean',
                  example: true,
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
                title: {
                  type: 'string',
                  example: '오늘의 운동',
                  description: '게시글 제목 (없을 경우 작성 날짜가 기본값)',
                },
              },
            },
          },
          user: {
            type: 'object',
            properties: {
              nickname: {
                type: 'string',
                example: '재굴TV',
              },
              profileImage: {
                type: 'string',
                example:
                  'https://ssuled-bucket.s3.amazonaws.com/profiles/user1.jpg',
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
            example: ['CHEST', 'SHOULDERS_ARMS', 'BACK'],
          },
          duration: {
            type: 'number',
            example: 90,
          },
          isPublic: {
            type: 'boolean',
            example: true,
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
          userLiked: {
            type: 'boolean',
            example: true,
            description: '현재 사용자의 좋아요 여부',
          },
          isMine: {
            type: 'boolean',
            example: true,
            description: '현재 사용자의 게시글 여부',
          },
          title: {
            type: 'string',
            example: '오늘의 운동',
            description: '게시글 제목 (없을 경우 작성 날짜가 기본값)',
          },
          user: {
            type: 'object',
            properties: {
              nickname: {
                type: 'string',
                example: '재굴TV',
              },
              profileImage: {
                type: 'string',
                example:
                  'https://ssuled-bucket.s3.amazonaws.com/profiles/user1.jpg',
              },
            },
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
          isPublic: {
            type: 'boolean',
            description: '게시글 공개 여부',
            example: true,
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
          title: {
            type: 'string',
            example: '오늘의 운동 기록',
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
          isPublic: {
            type: 'boolean',
            example: true,
          },
          isMine: {
            type: 'boolean',
            example: true,
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

export function ApiCreateComment() {
  return applyDecorators(
    ApiOperation({
      summary: '댓글 생성',
      description: '게시글에 새로운 댓글을 작성합니다.',
    }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          postId: {
            type: 'integer',
            description: '댓글을 작성할 게시글 ID',
            example: 1,
          },
          content: {
            type: 'string',
            description: '댓글 내용',
            example: '오운완 축하합니다! 💪',
          },
        },
        required: ['postId', 'content'],
      },
    }),
    ApiResponse({
      status: 201,
      description: '댓글이 성공적으로 생성됨',
      schema: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            example: 1,
          },
          content: {
            type: 'string',
            example: '오운완 축하합니다! 💪',
          },
          postId: {
            type: 'integer',
            example: 1,
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-03-20T10:30:00Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-03-20T10:30:00Z',
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
              'content must be a string',
              'content should not be empty',
              'postId must be a number',
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
    ApiResponse({
      status: 404,
      description: '게시글 또는 사용자를 찾을 수 없음',
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

export function ApiUpdateComment() {
  return applyDecorators(
    ApiOperation({
      summary: '댓글 수정',
      description: '특정 ID의 댓글을 수정합니다.',
    }),
    ApiParam({
      name: 'commentId',
      description: '수정할 댓글 ID',
      required: true,
      type: 'string',
    }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          content: {
            type: 'string',
            description: '댓글 내용',
            example: '정말 멋진 운동이네요! 👍',
          },
        },
        required: ['content'],
      },
    }),
    ApiResponse({
      status: 200,
      description: '댓글이 성공적으로 수정됨',
      schema: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            example: 1,
          },
          content: {
            type: 'string',
            example: '정말 멋진 운동이네요! 👍',
          },
          postId: {
            type: 'integer',
            example: 1,
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-03-20T10:30:00Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-03-20T10:35:00Z',
          },
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: '댓글을 찾을 수 없음',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: '해당 ID의 댓글을 찾을 수 없습니다.',
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
            example: [
              'content must be a string',
              'content should not be empty',
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
    ApiResponse({
      status: 403,
      description: '권한 없음',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: '이 댓글을 수정할 권한이 없습니다.',
          },
          error: {
            type: 'string',
            example: 'Forbidden',
          },
          statusCode: {
            type: 'number',
            example: 403,
          },
        },
      },
    }),
  );
}

export function ApiGetAllComments() {
  return applyDecorators(
    ApiOperation({
      summary: '모든 댓글 조회',
      description: '특정 게시글의 모든 댓글을 조회합니다.',
    }),
    ApiParam({
      name: 'postId',
      description: '댓글을 조회할 게시글 ID',
      required: true,
      type: 'string',
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
      description: '페이지당 댓글 수 (default: 10)',
      type: 'number',
      example: 10,
    }),
    ApiResponse({
      status: 200,
      description: '댓글 목록 조회 성공',
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
                  example: '멋진 운동이네요!',
                },
                postId: {
                  type: 'number',
                  example: 1,
                },
                isMine: {
                  type: 'boolean',
                  example: false,
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
                user: {
                  type: 'object',
                  properties: {
                    nickname: {
                      type: 'string',
                      example: '재굴TV',
                    },
                    profileImage: {
                      type: 'string',
                      example:
                        'https://ssuled-bucket.s3.amazonaws.com/profiles/user1.jpg',
                    },
                  },
                },
              },
            },
          },
          meta: {
            type: 'object',
            properties: {
              totalItems: {
                type: 'number',
                example: 25,
              },
              itemsPerPage: {
                type: 'number',
                example: 10,
              },
              totalPages: {
                type: 'number',
                example: 3,
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
    ApiResponse({
      status: 404,
      description: '댓글을 찾을 수 없음',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: '해당 ID의 댓글을 찾을 수 없습니다.',
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

export function ApiGetComment() {
  return applyDecorators(
    ApiOperation({
      summary: '댓글 상세 조회',
      description: '특정 ID의 댓글을 상세하게 조회합니다.',
    }),
    ApiParam({
      name: 'commentId',
      description: '조회할 댓글 ID',
      required: true,
      type: 'string',
    }),
    ApiResponse({
      status: 200,
      description: '댓글 상세 조회 성공',
      schema: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
            example: 1,
          },
          content: {
            type: 'string',
            example: '멋진 운동이네요!',
          },
          postId: {
            type: 'number',
            example: 1,
          },
          isMine: {
            type: 'boolean',
            example: false,
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
    }),
    ApiResponse({
      status: 404,
      description: '댓글을 찾을 수 없음',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: '해당 ID의 댓글을 찾을 수 없습니다.',
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

export function ApiDeleteComment() {
  return applyDecorators(
    ApiOperation({
      summary: '댓글 삭제',
      description: '특정 ID의 댓글을 삭제합니다.',
    }),
    ApiParam({
      name: 'commentId',
      description: '삭제할 댓글 ID',
      required: true,
      type: 'string',
    }),
    ApiResponse({
      status: 200,
      description: '댓글이 성공적으로 삭제됨',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: '댓글이 성공적으로 삭제되었습니다.',
          },
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: '댓글을 찾을 수 없음',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: '해당 ID의 댓글을 찾을 수 없습니다.',
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
      status: 403,
      description: '권한 없음',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: '이 댓글을 삭제할 권한이 없습니다.',
          },
          error: {
            type: 'string',
            example: 'Forbidden',
          },
          statusCode: {
            type: 'number',
            example: 403,
          },
        },
      },
    }),
  );
}

export function ApiCreateLike() {
  return applyDecorators(
    ApiOperation({
      summary: '좋아요 추가',
      description: '게시글에 좋아요를 추가합니다.',
    }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          postId: {
            type: 'integer',
            description: '좋아요를 추가할 게시글 ID',
            example: 1,
          },
        },
        required: ['userUuid', 'postId'],
      },
    }),
    ApiResponse({
      status: 201,
      description: '좋아요가 성공적으로 추가됨',
      schema: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            example: 1,
          },
          likeCount: {
            type: 'integer',
            example: 15,
            description: '게시글의 전체 좋아요 수',
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
    ApiResponse({
      status: 404,
      description: '사용자를 찾을 수 없음',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example:
              'UUID 123e4567-e89b-12d3-a456-426614174000에 해당하는 사용자를 찾을 수 없습니다.',
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
      status: 409,
      description: '이미 좋아요한 게시글',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: '이미 좋아요한 게시글입니다.',
          },
          error: {
            type: 'string',
            example: 'Conflict',
          },
          statusCode: {
            type: 'number',
            example: 409,
          },
        },
      },
    }),
  );
}

export function ApiCheckLikeStatus() {
  return applyDecorators(
    ApiOperation({
      summary: '좋아요 상태 확인',
      description: '사용자가 특정 게시글에 좋아요했는지 확인합니다.',
    }),
    ApiParam({
      name: 'postId',
      description: '확인할 게시글 ID',
      required: true,
      type: 'string',
    }),
    ApiResponse({
      status: 200,
      description: '좋아요 상태 확인 성공',
      schema: {
        type: 'object',
        properties: {
          liked: {
            type: 'boolean',
            example: true,
            description: '좋아요 여부',
          },
        },
      },
    }),
  );
}

export function ApiDeleteLike() {
  return applyDecorators(
    ApiOperation({
      summary: '게시글 좋아요 삭제',
      description: '특정 게시글에 대한 사용자의 좋아요를 삭제합니다.',
    }),
    ApiParam({
      name: 'postId',
      description: '게시글 ID',
      required: true,
      type: 'string',
    }),
    ApiResponse({
      status: 200,
      description: '좋아요가 성공적으로 삭제됨',
      schema: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: true,
          },
          likeCount: {
            type: 'number',
            example: 14,
            description: '업데이트된 게시글의 전체 좋아요 수',
          },
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: '좋아요를 찾을 수 없음',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: '해당 게시글에 좋아요를 하지 않았습니다.',
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

export function ApiCreateGroup() {
  return applyDecorators(
    ApiOperation({
      summary: '그룹 생성',
      description: '새로운 그룹을 생성합니다.',
    }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            description: '그룹 제목',
            example: '같이 운동해요',
          },
          password: {
            type: 'string',
            description: '그룹 비밀번호 (선택사항)',
            example: '1234',
          },
          isAccessible: {
            type: 'boolean',
            description: '그룹 공개 여부',
            example: false,
          },
          maxMember: {
            type: 'number',
            description: '최대 멤버 수',
            example: 4,
          },
        },
        required: ['title'],
      },
    }),
    ApiResponse({
      status: 201,
      description: '그룹이 성공적으로 생성됨',
      schema: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
            example: 1,
          },
          title: {
            type: 'string',
            example: '같이 운동해요',
          },
          isAccessible: {
            type: 'boolean',
            example: false,
          },
          maxMember: {
            type: 'number',
            example: 4,
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-03-31T10:00:00.000Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-03-31T10:00:00.000Z',
          },
          isOwner: {
            type: 'boolean',
            example: true,
            description: '현재 로그인한 사용자의 방장 여부',
          },
          members: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                userName: {
                  type: 'string',
                  example: '홍길동',
                },
                userImage: {
                  type: 'string',
                  example: 'https://example.com/profile1.jpg',
                },
                userIntroduction: {
                  type: 'string',
                  example: '안녕하세요',
                },
              },
            },
          },
        },
      },
    }),
    ApiResponse({
      status: 401,
      description: '권한 없음',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Unauthorized',
          },
          statusCode: {
            type: 'number',
            example: 401,
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
            example: ['title must be a string', 'title should not be empty'],
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

export function ApiUpdateGroup() {
  return applyDecorators(
    ApiOperation({
      summary: '그룹 수정',
      description: '그룹 방장이 특정 ID의 그룹을 수정합니다.',
    }),
    ApiParam({
      name: 'groupId',
      description: '수정할 그룹 ID',
      required: true,
      type: 'string',
      example: '1',
    }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            description: '그룹 제목',
            example: '수정된 그룹 제목',
          },
          password: {
            type: 'string',
            description: '그룹 비밀번호 (선택사항)',
            example: '7890',
          },
          isAccessible: {
            type: 'boolean',
            description: '그룹 공개 여부',
            example: false,
          },
          maxMember: {
            type: 'number',
            description: '최대 멤버 수',
            example: 6,
          },
        },
      },
    }),
    ApiResponse({
      status: 200,
      description: '그룹이 성공적으로 수정됨',
      schema: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
            example: 1,
          },
          title: {
            type: 'string',
            example: '수정된 그룹 제목',
          },
          isAccessible: {
            type: 'boolean',
            example: false,
          },
          maxMember: {
            type: 'number',
            example: 6,
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-03-31T10:00:00.000Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-03-31T30:00:00.000Z',
          },
          isOwner: {
            type: 'boolean',
            example: true,
            description: '현재 로그인한 사용자의 방장 여부',
          },
          members: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                userName: {
                  type: 'string',
                  example: '홍길동',
                },
                userImage: {
                  type: 'string',
                  example: 'https://example.com/profile1.jpg',
                },
                userIntroduction: {
                  type: 'string',
                  example: '안녕하세요',
                },
              },
            },
          },
        },
      },
    }),
    ApiResponse({
      status: 401,
      description: '권한 없음',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Unauthorized',
          },
          statusCode: {
            type: 'number',
            example: 401,
          },
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: '그룹을 찾을 수 없음',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: '해당 ID의 그룹을 찾을 수 없습니다.',
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

export function ApiDeleteGroup() {
  return applyDecorators(
    ApiOperation({
      summary: '그룹 삭제',
      description: '그룹 방장이 특정 ID의 그룹을 삭제합니다.',
    }),
    ApiParam({
      name: 'groupId',
      description: '삭제할 그룹 ID',
      required: true,
      type: 'string',
    }),
    ApiResponse({
      status: 200,
      description: '그룹이 성공적으로 삭제됨',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: '그룹이 성공적으로 삭제되었습니다.',
          },
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: '그룹을 찾을 수 없음',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: '해당 ID의 그룹을 찾을 수 없습니다.',
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
      status: 403,
      description: '권한 없음',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: '이 그룹을 삭제할 권한이 없습니다.',
          },
          error: {
            type: 'string',
            example: 'Unauthorized',
          },
          statusCode: {
            type: 'number',
            example: 403,
          },
        },
      },
    }),
  );
}

export function ApiGetAllGroups() {
  return applyDecorators(
    ApiOperation({
      summary: '모든 공개 그룹 조회',
      description: '모든 공개 그룹을 조회합니다.',
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
      description: '페이지당 그룹 수 (default: 10)',
      type: 'number',
      example: 10,
    }),
    ApiResponse({
      status: 200,
      description: '공개 그룹 목록 조회 성공',
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
                title: {
                  type: 'string',
                  example: '같이 운동해요',
                },
                isAccessible: {
                  type: 'boolean',
                  example: true,
                },
                maxMember: {
                  type: 'number',
                  example: 4,
                },
                createdAt: {
                  type: 'string',
                  format: 'date-time',
                  example: '2025-03-31T10:00:00.000Z',
                },
                updatedAt: {
                  type: 'string',
                  format: 'date-time',
                  example: '2025-03-31T10:00:00.000Z',
                },
                isOwner: {
                  type: 'boolean',
                  example: true,
                  description: '현재 로그인한 사용자의 방장 여부',
                },
                members: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      userName: {
                        type: 'string',
                        example: '홍길동',
                      },
                      userImage: {
                        type: 'string',
                        example: 'https://example.com/profile1.jpg',
                      },
                      userIntroduction: {
                        type: 'string',
                        example: '안녕하세요',
                      },
                    },
                  },
                },
              },
            },
          },
          meta: {
            type: 'object',
            properties: {
              totalItems: {
                type: 'number',
                example: 25,
              },
              itemsPerPage: {
                type: 'number',
                example: 10,
              },
              totalPages: {
                type: 'number',
                example: 3,
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

export function ApiGetGroup() {
  return applyDecorators(
    ApiOperation({
      summary: '그룹 상세 조회',
      description: '특정 ID의 그룹을 상세하게 조회합니다.',
    }),
    ApiParam({
      name: 'groupId',
      description: '조회할 그룹 ID',
      required: true,
      type: 'string',
    }),
    ApiResponse({
      status: 200,
      description: '그룹 상세 조회 성공',
      schema: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
            example: 1,
          },
          title: {
            type: 'string',
            example: '같이 운동해요',
          },
          isAccessible: {
            type: 'boolean',
            example: true,
          },
          maxMember: {
            type: 'number',
            example: 4,
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-03-31T10:00:00.000Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-03-31T10:00:00.000Z',
          },
          isOwner: {
            type: 'boolean',
            example: true,
            description: '현재 로그인한 사용자의 방장 여부',
          },
          members: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                userName: {
                  type: 'string',
                  example: '홍길동',
                },
                userImage: {
                  type: 'string',
                  example: 'https://example.com/profile1.jpg',
                },
                userIntroduction: {
                  type: 'string',
                  example: '안녕하세요',
                },
              },
            },
          },
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: '그룹을 찾을 수 없음',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: '해당 ID의 그룹을 찾을 수 없습니다.',
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

export function ApiJoinGroup() {
  return applyDecorators(
    ApiOperation({
      summary: '그룹 참여',
      description:
        '특정 그룹에 참여합니다. 비공개 그룹인 경우 비밀번호가 필요합니다.',
    }),
    ApiParam({
      name: 'groupId',
      description: '참여할 그룹 ID',
      required: true,
      type: 'string',
      example: '1',
    }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          password: {
            type: 'string',
            description: '그룹 비밀번호 (비공개 그룹인 경우 필요)',
            example: '1234',
          },
        },
        required: [],
      },
    }),
    ApiResponse({
      status: 200,
      description: '그룹 참여 성공',
      schema: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
            example: 1,
          },
          title: {
            type: 'string',
            example: '같이 운동해요',
          },
          isAccessible: {
            type: 'boolean',
            example: true,
          },
          maxMember: {
            type: 'number',
            example: 4,
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-03-31T10:00:00.000Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-03-31T11:00:00.000Z',
          },
          isOwner: {
            type: 'boolean',
            example: false,
            description: '현재 로그인한 사용자의 방장 여부',
          },
          members: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                userName: {
                  type: 'string',
                  example: '홍길동',
                },
                userImage: {
                  type: 'string',
                  example: 'https://example.com/profile1.jpg',
                },
                userIntroduction: {
                  type: 'string',
                  example: '안녕하세요',
                },
              },
            },
          },
        },
      },
    }),
    ApiResponse({
      status: 401,
      description: '권한 없음',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Unauthorized',
          },
          statusCode: {
            type: 'number',
            example: 401,
          },
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: '그룹을 찾을 수 없음',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: '해당 ID의 그룹을 찾을 수 없습니다.',
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

export function ApiLeaveGroup() {
  return applyDecorators(
    ApiOperation({
      summary: '그룹 탈퇴',
      description: '그룹에서 탈퇴합니다. 방장은 그룹을 탈퇴할 수 없습니다.',
    }),
    ApiResponse({
      status: 200,
      description: '그룹 탈퇴 성공',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: '그룹에서 성공적으로 탈퇴했습니다.',
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
            example: '방장은 그룹을 탈퇴할 수 없습니다. 그룹을 삭제하세요.',
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
    ApiResponse({
      status: 404,
      description: '그룹을 찾을 수 없음',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: '해당 ID의 그룹을 찾을 수 없습니다.',
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

export function ApiGetUserGroup() {
  return applyDecorators(
    ApiOperation({
      summary: '사용자가 속한 그룹 조회',
      description:
        '사용자가 현재 속한 그룹을 조회합니다. 한 사용자는 최대 하나의 그룹에만 속할 수 있습니다.',
    }),
    ApiResponse({
      status: 200,
      description: '사용자가 속한 그룹 정보',
      schema: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
            example: 1,
          },
          title: {
            type: 'string',
            example: '같이 운동해요',
          },
          isAccessible: {
            type: 'boolean',
            example: true,
          },
          maxMember: {
            type: 'number',
            example: 4,
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-03-31T10:00:00.000Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-03-31T11:00:00.000Z',
          },
          isOwner: {
            type: 'boolean',
            example: true,
            description: '현재 로그인한 사용자의 방장 여부',
          },
          members: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                userName: {
                  type: 'string',
                  example: '홍길동',
                },
                userImage: {
                  type: 'string',
                  example: 'https://example.com/profile1.jpg',
                },
                userIntroduction: {
                  type: 'string',
                  example: '안녕하세요',
                },
              },
            },
          },
        },
      },
    }),
    ApiResponse({
      status: 401,
      description: '권한 없음',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Unauthorized',
          },
          statusCode: {
            type: 'number',
            example: 401,
          },
        },
      },
    }),
  );
}

export function ApiGetGroupPosts() {
  return applyDecorators(
    ApiOperation({
      summary: '그룹 게시글 조회',
      description: '특정 그룹에 속한 모든 멤버들의 게시글을 조회합니다.',
    }),
    ApiParam({
      name: 'groupId',
      required: true,
      description: '그룹 ID',
      type: 'number',
    }),
    ApiQuery({
      name: 'page',
      required: false,
      description: '페이지 번호 (default: 1)',
      type: 'number',
    }),
    ApiQuery({
      name: 'limit',
      required: false,
      description: '페이지당 항목 수 (default: 24)',
      type: 'number',
    }),
    ApiResponse({
      status: 200,
      description: '그룹 게시글 조회 성공',
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
                title: {
                  type: 'string',
                  example: '오늘의 운동 완료! 💪',
                },
                content: {
                  type: 'string',
                  example:
                    '오늘도 성공적으로 운동을 완료했습니다. 모두 화이팅하세요!',
                },
                isMine: {
                  type: 'boolean',
                  example: true,
                },
                createdAt: {
                  type: 'string',
                  format: 'date-time',
                  example: '2023-04-15T09:00:00.000Z',
                },
                updatedAt: {
                  type: 'string',
                  format: 'date-time',
                  example: '2023-04-15T09:00:00.000Z',
                },
                likeCount: {
                  type: 'number',
                  example: 5,
                },
                commentCount: {
                  type: 'number',
                  example: 3,
                },
              },
            },
          },
          user: {
            type: 'object',
            properties: {
              nickname: {
                type: 'string',
                example: '재굴TV',
              },
              profileImage: {
                type: 'string',
                example:
                  'https://ssuled-bucket.s3.amazonaws.com/profiles/user1.jpg',
              },
            },
          },
          meta: {
            type: 'object',
            properties: {
              totalItems: {
                type: 'number',
                example: 15,
              },
              itemsPerPage: {
                type: 'number',
                example: 24,
              },
              totalPages: {
                type: 'number',
                example: 2,
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
    ApiResponse({
      status: 404,
      description: '그룹을 찾을 수 없음',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: '해당 그룹을 찾을 수 없거나 그룹에 멤버가 없습니다.',
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

export function ApiKakaoLogin() {
  return applyDecorators(
    ApiOperation({
      summary: '카카오 로그인',
      description:
        '카카오 인가 코드를 통해 유저 정보를 받아 로그인 처리합니다.',
    }),
    ApiBody({
      schema: {
        type: 'object',
        required: ['code'],
        properties: {
          code: {
            type: 'string',
            description: '카카오 인가 코드',
            example: 'QwrwER124ADSda==',
          },
        },
      },
    }),
    ApiResponse({
      status: 200,
      description: '로그인 성공',
      schema: {
        type: 'object',
        properties: {
          access_token: { type: 'string', example: 'access.jwt.token' },
          refresh_token: { type: 'string', example: 'refresh.jwt.token' },
          message: { type: 'string', example: '로그인 성공' },
        },
      },
    }),
    ApiResponse({
      status: 401,
      description: '카카오 로그인 실패',
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string', example: '카카오 로그인 실패' },
          error: { type: 'string', example: 'Unauthorized' },
        },
      },
    }),
  );
}

export function ApiNaverLogin() {
  return applyDecorators(
    ApiOperation({
      summary: '네이버 로그인',
      description:
        '네이버 인가 코드를 통해 유저 정보를 받아 로그인 처리합니다.',
    }),
    ApiBody({
      schema: {
        type: 'object',
        required: ['code'],
        properties: {
          code: {
            type: 'string',
            description: '네이버 인가 코드',
            example: 'QwrwER124ADSda==',
          },
        },
      },
    }),
    ApiResponse({
      status: 200,
      description: '로그인 성공',
      schema: {
        type: 'object',
        properties: {
          access_token: { type: 'string', example: 'access.jwt.token' },
          refresh_token: { type: 'string', example: 'refresh.jwt.token' },
          message: { type: 'string', example: '로그인 성공' },
        },
      },
    }),
    ApiResponse({
      status: 401,
      description: '네이버 로그인 실패',
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string', example: '네이버 로그인 실패' },
          error: { type: 'string', example: 'Unauthorized' },
        },
      },
    }),
  );
}

import { ApiHeader } from '@nestjs/swagger';

export function ApiRefreshToken() {
  return applyDecorators(
    ApiOperation({
      summary: 'AccessToken 재발급',
      description:
        '리프레시 토큰을 Authorization 헤더로 보내 새로운 AccessToken을 발급받습니다.',
    }),
    ApiHeader({
      name: 'Authorization',
      description: 'Bearer {refresh_token}',
      required: true,
    }),
    ApiResponse({
      status: 200,
      description: 'accessToken 및 refreshToken 재발급 성공',
      schema: {
        type: 'object',
        properties: {
          access_token: { type: 'string', example: 'new.access.token' },
          refresh_token: {
            type: 'string',
            example: 'new.refresh.token (optional)',
          },
          message: { type: 'string', example: 'accessToken 재발급 완료' },
        },
      },
    }),
    ApiResponse({
      status: 401,
      description: '리프레시 토큰 유효성 검사 실패',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: '리프레시 토큰 만료 혹은 잘못됨',
          },
        },
      },
    }),
  );
}

export function ApiLogout() {
  return applyDecorators(
    ApiOperation({
      summary: '로그아웃',
      description: '유저의 리프레시 토큰을 무효화하여 로그아웃합니다.',
    }),
    ApiBearerAuth(),
    ApiResponse({
      status: 200,
      description: '로그아웃 성공',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: '로그아웃 완료',
          },
          statusCode: {
            type: 'number',
            example: 200,
          },
        },
      },
    }),
    ApiResponse({
      status: 401,
      description: 'JWT 토큰이 유효하지 않거나 만료된 경우',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 401 },
          message: { type: 'string', example: 'Unauthorized' },
          error: { type: 'string', example: 'Unauthorized' },
        },
      },
    }),
  );
}

export function ApiUpdateNickname() {
  return applyDecorators(
    ApiOperation({
      summary: '닉네임 변경',
      description: '현재 로그인한 사용자의 닉네임을 변경합니다.',
    }),
    ApiBearerAuth(),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          newNickname: {
            type: 'string',
            example: '새로운닉네임',
          },
        },
        required: ['newNickname'],
      },
    }),
    ApiResponse({
      status: 200,
      description: '닉네임 변경 성공',
      schema: {
        example: {
          nickname: '새로운닉네임',
          message: '닉네임 변경 성공',
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: '사용자를 찾을 수 없음',
      schema: {
        example: {
          statusCode: 404,
          message: '사용자를 찾을 수 없습니다.',
          error: 'Not Found',
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: '닉네임 유효성 실패 등 잘못된 요청',
      schema: {
        example: {
          statusCode: 400,
          message: '닉네임은 최소 2자 이상이어야 합니다.',
          error: 'Bad Request',
        },
      },
    }),
  );
}

export function ApiGetPopularPosts() {
  return applyDecorators(
    ApiOperation({
      summary: '인기 게시글 조회',
      description: '좋아요와 댓글 수를 기반으로 인기 게시글 목록을 조회합니다.',
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
      description: '페이지당 항목 수 (default: 24)',
      type: 'number',
      example: 24,
    }),
    ApiResponse({
      status: 200,
      description: '인기 게시글 목록 조회 성공',
      schema: {
        type: 'object',
        properties: {
          data: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'number', example: 1 },
                title: { type: 'string', example: '오늘의 운동 완료! 💪' },
                content: { type: 'string', example: '하체 불태웠다🔥' },
                imageUrl: {
                  type: 'array',
                  items: { type: 'string' },
                  example: [
                    'https://ssuled-bucket.s3.amazonaws.com/images/example.jpg',
                  ],
                },
                bodyPart: {
                  type: 'array',
                  items: {
                    type: 'string',
                    enum: ['CHEST', 'BACK', 'LEGS', 'CORE'],
                  },
                  example: ['LEGS'],
                },
                duration: { type: 'number', example: 60 },
                likeCount: { type: 'number', example: 42 },
                commentCount: { type: 'number', example: 18 },
                isMine: { type: 'boolean', example: false },
                createdAt: {
                  type: 'string',
                  format: 'date-time',
                  example: '2025-04-01T10:00:00.000Z',
                },
                updatedAt: {
                  type: 'string',
                  format: 'date-time',
                  example: '2025-04-01T12:00:00.000Z',
                },
              },
            },
          },
          meta: {
            type: 'object',
            properties: {
              totalItems: { type: 'number', example: 100 },
              itemsPerPage: { type: 'number', example: 24 },
              totalPages: { type: 'number', example: 10 },
              currentPage: { type: 'number', example: 1 },
            },
          },
        },
      },
    }),
  );
}

export function ApiDevToken() {
  return applyDecorators(
    ApiOperation({
      summary: '개발용 토큰 발급 API',
      description: '개발 및 테스트 환경에서 사용할 JWT 토큰을 발급합니다.',
    }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          userUuid: {
            type: 'string',
            format: 'uuid',
            example: '123e4567-e89b-12d3-a456-426614174000',
          },
        },
        required: ['userUuid'],
      },
    }),
    ApiResponse({
      status: 200,
      description: '토큰 발급 성공',
      schema: {
        type: 'object',
        properties: {
          access_token: {
            type: 'string',
            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
          },
          refresh_token: {
            type: 'string',
            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
          },
          message: {
            type: 'string',
            example: '개발용 토큰이 생성되었습니다.',
          },
        },
      },
    }),
    ApiResponse({
      status: 500,
      description: '토큰 발급 실패',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: '개발용 토큰 생성 실패',
          },
          error: {
            type: 'string',
            example: '사용자를 찾을 수 없습니다.',
          },
        },
      },
    }),
    ApiResponse({
      status: 403,
      description: '프로덕션 환경에서 접근 시',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: '이 API는 개발 환경에서만 사용할 수 있습니다.',
          },
        },
      },
    }),
  );
}

export function ApiTestAuth() {
  return applyDecorators(
    ApiOperation({
      summary: '인증 테스트 API',
      description: 'JWT 토큰 인증이 정상적으로 작동하는지 테스트합니다.',
    }),
    ApiBearerAuth(),
    ApiResponse({
      status: 200,
      description: '인증 성공',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: '인증 성공',
          },
          userUuid: {
            type: 'string',
            format: 'uuid',
            example: '123e4567-e89b-12d3-a456-426614174000',
          },
          timestamp: {
            type: 'string',
            format: 'date-time',
            example: '2025-04-03T12:34:56.789Z',
          },
        },
      },
    }),
    ApiResponse({
      status: 401,
      description: '인증 실패',
      schema: {
        type: 'object',
        properties: {
          statusCode: {
            type: 'number',
            example: 401,
          },
          message: {
            type: 'string',
            example: 'Unauthorized',
          },
          error: {
            type: 'string',
            example: 'Unauthorized',
          },
        },
      },
    }),
  );
}

export function ApiVerifyToken() {
  return applyDecorators(
    ApiOperation({
      summary: '토큰 직접 검증 API',
      description: 'JWT 토큰을 직접 검증합니다.',
    }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          token: {
            type: 'string',
            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
          },
        },
        required: ['token'],
      },
    }),
    ApiResponse({
      status: 200,
      description: '토큰 검증 성공',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: '토큰 검증 성공',
          },
          decoded: {
            type: 'object',
            properties: {
              userUuid: {
                type: 'string',
                format: 'uuid',
                example: '123e4567-e89b-12d3-a456-426614174000',
              },
              iat: {
                type: 'number',
                example: 1712156121,
              },
              exp: {
                type: 'number',
                example: 1712159721,
              },
            },
          },
        },
      },
    }),
    ApiResponse({
      status: 401,
      description: '토큰 검증 실패',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: '토큰 검증 실패',
          },
          error: {
            type: 'string',
            example: 'jwt expired',
          },
        },
      },
    }),
  );
}

export function ApiUpdateIntroduction() {
  return applyDecorators(
    ApiOperation({
      summary: '소개글 수정',
      description: '해당 유저의 소개글을 새로 수정합니다.',
    }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          newIntroduction: {
            type: 'string',
            example: '안녕하세요. 새로운 소개글입니다!',
          },
        },
        required: ['newIntroduction'],
      },
    }),
    ApiResponse({
      status: 200,
      description: '소개글 변경 성공',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: '소개글 변경 성공!',
          },
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: '유저를 찾을 수 없음',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: '사용자를 찾을 수 없습니다.',
          },
        },
      },
    }),
  );
}

export function ApiGetUserInfo() {
  return applyDecorators(
    ApiOperation({
      summary: '사용자 정보 조회',
      description: '로그인한 사용자의 정보를 조회합니다.',
    }),
    ApiResponse({
      status: 200,
      description: '사용자 정보 조회 성공',
      schema: {
        type: 'object',
        properties: {
          userName: {
            type: 'string',
            example: '익명_5',
          },
          userImage: {
            type: 'string',
            example:
              'https://ssuled-bucket.s3.ap-southeast-2.amazonaws.com/images/d11849a6-b1e1-4a61-91b5-2fc209fd23e1.jpeg',
          },
          userIntroduction: {
            type: 'string',
            example: '재굴재굴',
          },
        },
      },
    }),
    ApiResponse({
      status: 401,
      description: '권한 없음',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Unauthorized',
          },
          statusCode: {
            type: 'number',
            example: 401,
          },
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: '사용자를 찾을 수 없음',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: '사용자를 찾을 수 없습니다.',
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

export function ApiGetQuarterlyUserStatistics() {
  return applyDecorators(
    ApiOperation({
      summary: '분기별 사용자 운동 통계 조회',
      description:
        '지정된 연도와 분기에 대한 사용자의 운동 통계 데이터를 조회합니다.',
    }),
    ApiQuery({
      name: 'year',
      type: Number,
      required: true,
      example: 2025,
      description: '통계를 조회할 연도',
    }),
    ApiQuery({
      name: 'quarter',
      type: Number,
      required: true,
      example: 2,
      description: '통계를 조회할 분기 (1~4)',
    }),
    ApiResponse({
      status: 200,
      description: '운동 통계 조회 성공',
      schema: {
        type: 'object',
        properties: {
          data: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                date: { type: 'string', example: '2025-04-01' },
                didWorkout: { type: 'boolean', example: true },
              },
            },
          },
          streakInfo: {
            type: 'object',
            properties: {
              currentStreak: { type: 'number', example: 3 },
              longestStreak: { type: 'number', example: 7 },
              startDate: { type: 'string', example: '2025-04-01' },
              endDate: { type: 'string', example: '2025-06-30' },
            },
          },
          day: {
            type: 'object',
            properties: {
              dawn: { type: 'number', example: 1 },
              morning: { type: 'number', example: 5 },
              afternoon: { type: 'number', example: 4 },
              night: { type: 'number', example: 2 },
            },
          },
          exercise: {
            type: 'object',
            properties: {
              chest: { type: 'number', example: 5 },
              back: { type: 'number', example: 3 },
              legs: { type: 'number', example: 7 },
              core: { type: 'number', example: 2 },
              sports: { type: 'number', example: 1 },
              shoulders_arms: { type: 'number', example: 4 },
              cardio: { type: 'number', example: 6 },
              other: { type: 'number', example: 0 },
            },
          },
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: '사용자 통계 데이터가 존재하지 않음',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: '해당 분기의 사용자 통계를 찾을 수 없습니다.',
          },
        },
      },
    }),
  );
}

export function ApiGroupStreaks() {
  return applyDecorators(
    ApiOperation({
      summary: '그룹 분기별 날짜별 참여 인원 통계 조회',
      description:
        '지정된 연도와 분기에 대해 그룹의 날짜별 활동 인원 수를 반환합니다.',
    }),
    ApiQuery({
      name: 'groupId',
      type: Number,
      required: true,
      example: 1,
      description: '조회할 그룹 ID',
    }),
    ApiQuery({
      name: 'year',
      type: Number,
      required: true,
      example: 2025,
      description: '조회할 연도',
    }),
    ApiQuery({
      name: 'quarter',
      type: Number,
      required: true,
      example: 2,
      description: '조회할 분기 (1~4)',
    }),
    ApiResponse({
      status: 200,
      description: '그룹 활동 통계 조회 성공',
      schema: {
        type: 'object',
        properties: {
          data: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                day: { type: 'string', example: '2025-04-01' },
                value: { type: 'number', example: 7 },
              },
            },
          },
          groupInfo: {
            type: 'object',
            properties: {
              totalMembers: { type: 'number', example: 10 },
              startDate: { type: 'string', example: '2025-04-01' },
              endDate: { type: 'string', example: '2025-06-30' },
            },
          },
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: '그룹을 찾을 수 없거나 활동 기록이 없음',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: '그룹을 찾을 수 없습니다.',
          },
        },
      },
    }),
  );
}

export function ApiGetQuarterlyGroupRanking() {
  return applyDecorators(
    ApiOperation({
      summary: '분기별 그룹 랭킹 조회 (TOP 3)',
      description: '특정 연도와 분기에 대한 그룹 랭킹 상위 3개를 반환합니다.',
    }),
    ApiQuery({
      name: 'year',
      type: Number,
      required: true,
      example: 2025,
      description: '조회할 연도',
    }),
    ApiQuery({
      name: 'quarter',
      type: Number,
      required: true,
      example: 2,
      description: '조회할 분기 (1~4)',
    }),
    ApiResponse({
      status: 200,
      description: '그룹 랭킹 조회 성공',
      schema: {
        type: 'object',
        properties: {
          year: { type: 'number', example: 2025 },
          quarter: { type: 'number', example: 2 },
          top3: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                rank: { type: 'number', example: 1 },
                groupId: { type: 'number', example: 3 },
                groupName: { type: 'string', example: '불꽃체력조' },
                score: { type: 'number', example: 456.3 },
                commits: { type: 'number', example: 74 },
              },
            },
          },
        },
      },
    }),
    ApiResponse({
      status: 404,
      description: '해당 분기의 랭킹 정보가 존재하지 않을 경우',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: '랭킹 정보가 존재하지 않습니다.',
          },
        },
      },
    }),
  );
}

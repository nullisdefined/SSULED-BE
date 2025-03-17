import { BadRequestException, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

/**
 * 이미지 파일 업로드 데코레이터
 * @param fieldName 필드 이름
 * @param maxSize 최대 파일 크기
 * @returns 데코레이터 function
 */
export function ImageFileInterceptor(
  fieldName: string = 'image',
  maxSize: number = 10 * 1024 * 1024, // 10MB
) {
  return UseInterceptors(
    FileInterceptor(fieldName, {
      limits: {
        fileSize: maxSize,
      },
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/^image\/(jpg|jpeg|png|gif)$/)) {
          return cb(
            new BadRequestException('이미지 파일만 업로드 가능합니다.'),
            false,
          );
        }
        cb(null, true);
      },
    }),
  );
}

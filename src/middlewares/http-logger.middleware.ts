import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from '../utils/logger.service';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  private logger = LoggerService.getInstance().logger;

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, ip, body } = req;
    const userAgent = req.get('user-agent') || '';
    const startTime = Date.now();

    // 요청 로깅 (개인정보 필터링 고려)
    this.logger.debug(`Request: ${method} ${originalUrl}`, {
      ip,
      userAgent,
      body: this.sanitizeBody(body),
      context: 'HttpLogger',
    });

    // 원본 end 메서드 저장
    const originalEnd = res.end;

    // 응답 로깅을 위한 end 메서드 오버라이드
    res.end = function (chunk, encoding) {
      const responseTime = Date.now() - startTime;

      // 원본 end 호출
      originalEnd.call(this, chunk, encoding);

      // 응답 로깅
      LoggerService.getInstance().logger.debug(
        `Response: ${method} ${originalUrl} ${res.statusCode}`,
        {
          responseTime: `${responseTime}ms`,
          context: 'HttpLogger',
        },
      );
    } as any;

    next();
  }

  // 민감한 정보 필터링
  private sanitizeBody(body: any): any {
    if (!body) return body;

    const sanitized = { ...body };
    const sensitiveFields = ['password', 'token', 'secret', 'authorization'];

    for (const field of sensitiveFields) {
      if (field in sanitized) {
        sanitized[field] = '***';
      }
    }

    return sanitized;
  }
}

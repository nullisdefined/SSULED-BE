import { Logger, createLogger } from 'winston';
import { winstonConfig } from '../../config/logging.config';

export class LoggerService {
  private static instance: LoggerService;
  public readonly logger: Logger;

  private constructor() {
    this.logger = createLogger(winstonConfig);
  }

  public static getInstance(): LoggerService {
    if (!LoggerService.instance) {
      LoggerService.instance = new LoggerService();
    }
    return LoggerService.instance;
  }
}

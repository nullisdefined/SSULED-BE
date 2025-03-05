import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { Logger } from 'winston';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('winston')
    private readonly logger: Logger,
  ) {}

  @Get('logger')
  getHello(): string {
    this.logger.info('Called getHello()');
    this.logger.debug('Debug message');
    this.logger.error('Error message');
    return this.appService.getHello();
  }

  @Get('health')
  healthCheck() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
    };
  }
}

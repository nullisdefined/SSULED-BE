import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WinstonModule } from 'nest-winston';
import { ConfigModule } from '@nestjs/config';
import { winstonConfig } from '../config/loggin.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    WinstonModule.forRoot(winstonConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

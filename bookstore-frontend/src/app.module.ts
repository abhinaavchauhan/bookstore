import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { ApiService } from './api/api.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [AppService, ApiService],
})
export class AppModule { }

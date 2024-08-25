import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { HttpModule } from '@nestjs/axios';
import { config } from '../config';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesEntity } from './entities/movies.entity';

@Module({
  imports: [
    ConfigModule.forFeature(config),
    TypeOrmModule.forFeature([MoviesEntity]),
    HttpModule,
    AuthModule,
  ],
  controllers: [MoviesController],
  providers: [MoviesService],
  exports: [MoviesService]
})
export class MoviesModule {}

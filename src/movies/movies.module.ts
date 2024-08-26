import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MoviesController } from './movies.controller';
import { MoviesService } from './services/movies.service';
import { HttpModule } from '@nestjs/axios';
import { config } from '../config';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesEntity } from './entities/movies.entity';
import { MoviesInitService } from './services/moviesInit.service';
import { MoviesCronService } from './services/moviesCron.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([MoviesEntity]),
    ConfigModule.forFeature(config),
    HttpModule,
    AuthModule,
  ],
  controllers: [MoviesController],
  providers: [MoviesService, MoviesInitService, MoviesCronService],
  exports:[TypeOrmModule]
})
export class MoviesModule {}

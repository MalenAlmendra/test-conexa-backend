import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { AxiosError } from 'axios';
import { firstValueFrom, catchError } from 'rxjs';
import { config } from '../config';
import { MovieDTO } from './dto/movie.dto';
import { MoviesEntity } from './entities/movies.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MoviesService {
  private readonly logger = new Logger(MoviesService.name);
  constructor(
    @InjectRepository(MoviesEntity)
    private moviesRepository: Repository<MoviesEntity>,

    @Inject(config.KEY)
    private configService: ConfigType<typeof config>,

    private readonly httpService: HttpService,
  ) {}

  //TODO: en any va Movie[], movie es el dto
  async getAllMovies(): Promise<MovieDTO[]> {
    try {
      const { data } = await firstValueFrom(
        this.httpService
          .get<any>(`${this.configService.services.swapi}/films`)
          .pipe(
            catchError((error: AxiosError) => {
              this.logger.error(error.response?.data || 'Unknown error');
              throw new Error('An error happened!');
            }),
          ),
      );
      return data;
    } catch (error) {
      this.logger.error('Error en getAllMovies:', error);
      throw error;
    }
  }

  async getMovieDetails(idMovie: string): Promise<any> {
    try {
      const { data } = await firstValueFrom(
        this.httpService
          .get<any>(`${this.configService.services.swapi}/films/${idMovie}`)
          .pipe(
            catchError((error: AxiosError) => {
              this.logger.error(error.response?.data || 'Unknown error');
              throw new Error('An error happened!');
            }),
          ),
      );
      return data;
    } catch (error) {
      this.logger.error('Error en getAllMovies:', error);
      throw error;
    }
  }

  async createMovie(movie: MovieDTO): Promise<any> {
    try {
      const newMovie = this.moviesRepository.create({
        ...movie,
        characters: movie.characters || [],
        planets: movie.planets || [],
        starships: movie.starships || [],
        vehicles: movie.vehicles || [],
        species: movie.species || [],
      });
      return await this.moviesRepository.save(newMovie);
    } catch (error) {
      this.logger.error('Error creating movie:', error.message, error.stack);
      throw new BadRequestException('Something was wrong');
    }
  }
}

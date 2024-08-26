import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigType } from '@nestjs/config';
import { AxiosError } from 'axios';
import { firstValueFrom, catchError } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { config } from '../../config';
import { CreateMovieDTO, MoviesResponseDTO } from '../dto/movie.dto';
import { MoviesEntity } from '../entities/movies.entity';
import { UpdateMovieDto } from '../dto/updateMovie.dto';

@Injectable()
export class MoviesService {
  private readonly logger = new Logger(MoviesService.name);
  constructor(
    @InjectRepository(MoviesEntity)
    private readonly moviesRepository: Repository<MoviesEntity>,

    @Inject(config.KEY) private configService: ConfigType<typeof config>,

    private readonly httpService: HttpService,
  ) {}

  async getAllMovies(): Promise<MoviesResponseDTO> {
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
      this.logger.error('Error in getAllMovies:', error);
      throw error;
    }
  }

  async createMovie(movie: CreateMovieDTO): Promise<any> {
    try {
      const newMovie = this.moviesRepository.create(movie);
      return await this.moviesRepository.save(newMovie);
    } catch (error) {
      this.logger.error('Error creating movie:', error.message, error.stack);
      throw new BadRequestException('Something was wrong');
    }
  }

  async updateMovie(movie: UpdateMovieDto): Promise<any> {
    const { idMovie } = movie;

    const actualMovie = this.moviesRepository.findOne({
      where: { idMovie },
    });

    try {
      if (actualMovie) {
        await this.moviesRepository.update(idMovie, movie);
        return 'Movie Updated';
      } else {
        this.logger.error('La pelicula ingresada no existe en la bbdd');
        throw new NotFoundException(
          'La pelicula ingresada no existe en la bbdd',
        );
      }
    } catch (error) {
      this.logger.error('Error updating movie:', error.message, error.stack);
      throw new BadRequestException('Something was wrong');
    }
  }

  async deleteMovie(idMovie: string): Promise<any> {
    const actualMovie = this.moviesRepository.findOne({
      where: { idMovie },
    });
    try {
      if (actualMovie) {
        await this.moviesRepository.delete(idMovie);
        return 'Movie Deleted';
      } else {
        this.logger.error('La pelicula ingresada no existe en la bbdd');
        throw new NotFoundException(
          'La pelicula ingresada no existe en la bbdd',
        );
      }
    } catch (error) {
      this.logger.error('Error updating movie:', error.message, error.stack);
      throw new BadRequestException('Something was wrong');
    }
  }

  async syncMoviesFromAPI() {
    const response = await this.getAllMovies();

    const movies = response.results;

    for (const movie of movies) {

      const existingMovie = await this.moviesRepository.findOne({
        where: { episode_id: movie.episode_id },
      });

      if(existingMovie && ((movie.idMovie==='') || (movie.idMovie===undefined )|| (movie.idMovie===null))){
        movie.idMovie = uuidv4();
      }

      if (existingMovie) {
        await this.moviesRepository.update(existingMovie.idMovie, movie);
      } else {
        await this.moviesRepository.save(movie);
      }
    }
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MoviesService } from './movies.service';

@Injectable()
export class MoviesCronService {
  private readonly logger = new Logger(MoviesService.name);

  constructor(private readonly moviesService: MoviesService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleMovieSync() {
    this.logger.log('Sincronizando el listado de películas...');

    try {
      await this.moviesService.syncMoviesFromAPI();
      this.logger.log('Sincronización completada.');
    } catch (error) {
      this.logger.error('Error durante la sincronización de películas:', error);
    }
  }
}

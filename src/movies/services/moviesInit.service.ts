import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Injectable()
export class MoviesInitService implements OnApplicationBootstrap {
  private readonly logger = new Logger(MoviesService.name);

  constructor(private readonly moviesService: MoviesService) {}

  async onApplicationBootstrap() {
    this.logger.log(
      'Aplicación iniciada. Sincronizando la base de datos de películas...',
    );
    try {
      await this.moviesService.syncMoviesFromAPI();
      this.logger.log('Sincronización inicial completada.');
    } catch (error) {
      this.logger.error(
        'Error durante la sincronización inicial de películas:',
        error,
      );
    }
  }
}

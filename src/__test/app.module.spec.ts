jest.setTimeout(15000);

import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { getDataSourceToken } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { MoviesModule } from '../movies/movies.module';
import { MoviesService } from '../movies/services/movies.service';
import { MoviesController } from '../movies/movies.controller';

describe('AppModule', () => {
  let moduleRef: TestingModule;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule, ScheduleModule.forRoot(),
        AuthModule,
        UserModule,
        MoviesModule,],
      controllers:[MoviesController],
      providers:[MoviesService]
    })
      .overrideProvider(ConfigService)
      .useValue({
        get: jest.fn((key: string) => {
          if (key === 'config.server') {
            return { timeout: 5000, maxRedirects: 5 };
          }
          if (key === 'config.database') {
            return {
              host: 'localhost',
              port: 3306,
              user: 'root',
              password: 'root',
              name: 'moviesdb',
            };
          }
          if (key === 'config.jwtSecret') {
            return '429ac544998a1d6f42b50b487845cfdb';
          }
          return null;
        }),
      })
      .overrideProvider(getDataSourceToken())
      .useValue({ initialize: jest.fn().mockResolvedValue(true)})
      .compile();
  });

  it('should compile the AppModule', () => {
    expect(moduleRef).toBeDefined();
  });

  it('should have DataSource defined', () => {
    const dataSource = moduleRef.get<DataSource>(DataSource);
    expect(dataSource).toBeDefined();
  });

  it('should have MoviesController defined', () => {
    const moviesController = moduleRef.get('MoviesController');
    expect(moviesController).toBeDefined();
  });

  it('should have MoviesService defined', () => {
    const moviesService = moduleRef.get('MoviesService');
    expect(moviesService).toBeDefined();
  });
});

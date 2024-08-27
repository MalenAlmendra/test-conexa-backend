import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './services/movies.service';
import { MoviesInitService } from './services/moviesInit.service';
import { MoviesCronService } from './services/moviesCron.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesEntity } from './entities/movies.entity';
import { config } from '../config';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from '../auth/auth.module';
import { CreateMovieDTO } from './dto/movie.dto';
import { UpdateMovieDto } from './dto/updateMovie.dto';
import { MoviesServicesMock } from './mocks/moviesServicesMock';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

describe('MoviesController', () => {
  let controller: MoviesController;
  let service: MoviesService;
  let mockMoviesInitService = {};
  let mockMoviesCronService = {};

  beforeEach(async () => {
    const MoviesServiceProvider = {
      provide: MoviesService,
      useClass: MoviesServicesMock,
    };
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: 'root',
          database: 'moviesdb',
          entities: [MoviesEntity],
          synchronize: false,
        }),
        TypeOrmModule.forFeature([MoviesEntity]),
        ConfigModule.forFeature(config),
        HttpModule,
        AuthModule,
      ],
      controllers: [MoviesController],
      providers: [
        MoviesService,
        MoviesInitService,
        MoviesCronService,
        MoviesServiceProvider,
      ],
      exports: [TypeOrmModule],
    })
      .overrideProvider(MoviesService)
      .useClass(MoviesServicesMock)
      .overrideProvider(MoviesInitService)
      .useValue(mockMoviesInitService)
      .overrideProvider(MoviesCronService)
      .useValue(mockMoviesCronService)
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: jest.fn((context) => {
          const req = context.switchToHttp().getRequest();
          req.user = {
            username: 'paca43',
            isAdmin: true,
          };
          return true;
        }),
      })
      .compile();

    controller = module.get<MoviesController>(MoviesController);
    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get all the movies', async ()=>{
    const moviesList={
       count:1,
            next:null,
            previous:null,
            results:[
                {
                    "title": "A New Hope",
                    "episode_id": 4,
                    "opening_crawl": "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
                    "director": "George Lucas",
                    "producer": "Gary Kurtz, Rick McCallum",
                    "release_date": "1977-05-25",
                    "characters": [
                      "https://swapi.dev/api/people/1/",
                      "https://swapi.dev/api/people/2/",
                      "https://swapi.dev/api/people/3/",
                      "https://swapi.dev/api/people/4/",
                      "https://swapi.dev/api/people/5/",
                      "https://swapi.dev/api/people/6/",
                      "https://swapi.dev/api/people/7/",
                      "https://swapi.dev/api/people/8/",
                      "https://swapi.dev/api/people/9/",
                      "https://swapi.dev/api/people/10/",
                      "https://swapi.dev/api/people/12/",
                      "https://swapi.dev/api/people/13/",
                      "https://swapi.dev/api/people/14/",
                      "https://swapi.dev/api/people/15/",
                      "https://swapi.dev/api/people/16/",
                      "https://swapi.dev/api/people/18/",
                      "https://swapi.dev/api/people/19/",
                      "https://swapi.dev/api/people/81/"
                    ],
                    "planets": [
                      "https://swapi.dev/api/planets/1/",
                      "https://swapi.dev/api/planets/2/",
                      "https://swapi.dev/api/planets/3/"
                    ],
                    "starships": [
                      "https://swapi.dev/api/starships/2/",
                      "https://swapi.dev/api/starships/3/",
                      "https://swapi.dev/api/starships/5/",
                      "https://swapi.dev/api/starships/9/",
                      "https://swapi.dev/api/starships/10/",
                      "https://swapi.dev/api/starships/11/",
                      "https://swapi.dev/api/starships/12/",
                      "https://swapi.dev/api/starships/13/"
                    ],
                    "vehicles": [
                      "https://swapi.dev/api/vehicles/4/",
                      "https://swapi.dev/api/vehicles/6/",
                      "https://swapi.dev/api/vehicles/7/",
                      "https://swapi.dev/api/vehicles/8/"
                    ],
                    "species": [
                      "https://swapi.dev/api/species/1/",
                      "https://swapi.dev/api/species/2/",
                      "https://swapi.dev/api/species/3/",
                      "https://swapi.dev/api/species/4/",
                      "https://swapi.dev/api/species/5/"
                    ],
                    "created": "2014-12-10T14:23:31.880000Z",
                    "edited": "2014-12-20T19:49:45.256000Z",
                    "url": "https://swapi.dev/api/films/1/"
                  },
            ]
    }
    expect(await controller.getAllMovies()).toEqual(moviesList)
  })

  it('should get a specific movie', async ()=>{
    const mockRequest = {
      user: {
        isAdmin: false,
      },
    };
    const idMovie='5a1c65asw56c'
    expect(await controller.getMovieDetails(mockRequest,idMovie))
  })

  it('should create a movie', async () => {
    const mockRequest = {
      user: {
        isAdmin: true,
      },
    };
    const createMovieDTO: CreateMovieDTO = {
      title: 'The House Bunny',
      episode_id: 1,
      opening_crawl: null,
      director: 'Fred Wold',
      producer:
        'Adam Sandler, Jack Giarraputo, Allen Covert, Anna Faris, Kirsten Smith, Karen McCullah Lutz',
      release_date: '2008-08-22',
      characters: [
        'Anna Faris',
        'Colin Hanks',
        'Emma Stone',
        'Kat Dennings',
        'Christopher McDonald',
        "Beverly D'Angelo",
        'Katharine McPhee',
        'Rumer Willis',
      ],
      planets: null,
      starships: null,
      vehicles: null,
      species: null,
      created: '',
      edited: '',
      url: 'https://www.imdb.com/title/tt0852713/',
    };
    expect(await controller.createMovie(mockRequest, createMovieDTO)).toEqual({
      idMovie: expect.any(String),
      ...createMovieDTO,
    });
  });

  it('should update a movie', async () => {
    const mockRequest = {
      user: {
        isAdmin: true,
      },
    };
    const updateMovieDTO: UpdateMovieDto = {
      idMovie: '',
      title: 'The House Bunny',
      episode_id: 1,
      opening_crawl: null,
      director: 'Fred Wold',
      producer:
        'Adam Sandler, Jack Giarraputo, Allen Covert, Anna Faris, Kirsten Smith, Karen McCullah Lutz',
      release_date: '2008-08-22',
      characters: [
        'Anna Faris',
        'Colin Hanks',
        'Emma Stone',
        'Kat Dennings',
        'Christopher McDonald',
        "Beverly D'Angelo",
        'Katharine McPhee',
        'Rumer Willis',
      ],
      planets: null,
      starships: null,
      vehicles: null,
      species: null,
      created: '',
      edited: '',
      url: 'https://www.imdb.com/title/tt0852713/',
    };
    
    expect(await controller.updateMovie(mockRequest, updateMovieDTO)).toEqual({
      ...updateMovieDTO,
    });
  });

  it('should delete movie', async()=>{
    const idMovie='5a1c65asw56c'
    const mockRequest = {
      user: {
        isAdmin: true,
      },
    };
    expect(await controller.deleteMovie(mockRequest,idMovie))
  })
});

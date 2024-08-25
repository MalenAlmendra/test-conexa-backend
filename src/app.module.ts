import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from './config';
import { MoviesController } from './movies/movies.controller';
import { MoviesService } from './movies/movies.service';
import { MoviesModule } from './movies/movies.module';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserEntity } from './user/entities/user.entity';
import { MoviesEntity } from './movies/entities/movies.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      envFilePath: '.env',
      isGlobal: true,
    }),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const serverConfig= configService.get('config.server')
        return {
          timeout: serverConfig.timeout,
          maxRedirects: serverConfig.maxRedirects,
        }
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const dbConfig = configService.get('config.database')
        return {
          type: 'mysql',
          host: dbConfig.host,
          port: dbConfig.port,
          username: dbConfig.user,
          password: dbConfig.password,
          database: dbConfig.name,
          entities: [UserEntity,MoviesEntity],
          synchronize: true,
        }
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    MoviesModule,
  ],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}

import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateMovieDTO {
  @IsNumber()
  episode_id: number;

  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  opening_crawl?: string;

  @IsString()
  director: string;

  @IsString()
  producer: string;

  @IsString()
  release_date: string;

  @IsArray()
  @IsOptional()
  characters: string[];

  @IsArray()
  @IsOptional()
  planets: string[];

  @IsArray()
  @IsOptional()
  starships: string[];

  @IsArray()
  @IsOptional()
  vehicles: string[];

  @IsArray()
  @IsOptional()
  species: string[];

  @IsOptional()
  @IsString()
  created: string;

  @IsOptional()
  @IsString()
  edited: string;

  @IsOptional()
  @IsString()
  url: string;
}

export class MoviesResponseDTO {
  @IsNumber()
  count: number;

  @IsEmpty()
  next: null;

  @IsEmpty()
  previous: null;

  @IsArray()
  @Type(() => Result)
  results: Result[];
}

export class Result {
  @IsString()
  @IsOptional()
  idMovie?: string='';

  @IsString()
  title: string;

  @IsNumber()
  episode_id: number;

  @IsString()
  opening_crawl: string;

  @IsString()
  director: string;

  @IsString()
  producer: string;

  @IsString()
  release_date: string;

  @IsArray()
  characters: string[];

  @IsArray()
  planets: string[];

  @IsArray()
  starships: string[];

  @IsArray()
  vehicles: string[];

  @IsArray()
  species: string[];

  @IsString()
  created: string;

  @IsString()
  edited: string;

  @IsString()
  url: string;
}

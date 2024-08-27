import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
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

export class Result {
  @IsString()
  @IsOptional()
  @ApiProperty({description: 'The ID of the movie',})
  idMovie?: string='';

  @IsString()
  @ApiProperty({description: 'The title of the movie',})
  title: string;

  @IsNumber()
  @ApiProperty({description: 'Number of Episode',})
  episode_id: number;

  @IsString()
  @ApiProperty({description: 'Opening crowler',})
  opening_crawl: string;

  @IsString()
  @ApiProperty({description: 'Director',})
  director: string;

  @IsString()
  @ApiProperty({description: 'Producer',})
  producer: string;

  @IsString()
  @ApiProperty({description: 'Release date',})
  release_date: string;

  @IsArray()
  @ApiProperty({ description:'Characters' ,type: String, isArray: true })
  characters: string[];

  @IsArray()
  @ApiProperty({ description:'Planets' ,type: String, isArray: true })
  planets: string[];

  @IsArray()
  @ApiProperty({ description:'Starships', type: String, isArray: true })
  starships: string[];

  @IsArray()
  @ApiProperty({ description:'Vehicles', type: String, isArray: true })
  vehicles: string[];

  @IsArray()
  @ApiProperty({ description:'Species', type: String, isArray: true })
  species: string[];

  @IsString()
  @ApiProperty({description:'Created'})
  created: string;

  @IsString()
  @ApiProperty({description:'Edited'})
  edited: string;

  @IsString()
  @ApiProperty({description:'Url'})
  url: string;
}

export class MoviesResponseDTO {
  @ApiProperty()
  @IsNumber()
  count: number;

  @ApiProperty()
  @IsEmpty()
  next: null;

  @ApiProperty()
  @IsEmpty()
  previous: null;

  @ApiProperty({type:()=>Result, default: [] })
  @Type(() => Result)
  @ValidateNested()
  @IsArray()
  results: Result[];
}
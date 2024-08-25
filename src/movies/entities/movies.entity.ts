import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MoviesEntity {
  @PrimaryGeneratedColumn('uuid')
  idMovie: string;

  @Column()
  title: string;

  @Column()
  episode_id: number;

  @Column()
  opening_crawl: string;

  @Column()
  director: string;

  @Column()
  producer: string;

  @Column()
  release_date: string;

  @Column("simple-array")
  characters: string[];

  @Column("simple-array")
  planets: string[];

  @Column("simple-array")
  starships: string[];

  @Column("simple-array")
  vehicles: string[];

  @Column("simple-array")
  species: string[];

  @Column()
  created: string;

  @Column()
  edited: string;

  @Column()
  url: string;
}

import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn,UpdateDateColumn } from 'typeorm';

@Entity('Movies')
export class MoviesEntity {
 
  @PrimaryGeneratedColumn('uuid')
  idMovie:string;

  @Column()
  episode_id: number;

  @Column()
  title: string;

  @Column({ nullable: true, type:'longtext' })
  opening_crawl: string;

  @Column()
  director: string;

  @Column()
  producer: string;

  @Column()
  release_date: string;

  @Column("simple-array", { nullable: true })
  characters: string[];

  @Column("simple-array", { nullable: true })
  planets: string[];

  @Column("simple-array", { nullable: true })
  starships: string[];

  @Column("simple-array", { nullable: true })
  vehicles: string[];

  @Column("simple-array", { nullable: true })
  species: string[];

  @Column()
  @CreateDateColumn({nullable: true, type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)"})
  created: string;

  @Column()
  @UpdateDateColumn({ nullable: true, type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  edited: string;

  @Column({ nullable: true })
  url: string;
}

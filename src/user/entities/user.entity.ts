import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({unique: true})
  username: string;

  @Column()
  password: string;

  @Column()
  isAdmin:boolean;
}
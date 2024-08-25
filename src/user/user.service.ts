import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository, FindOneOptions } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findOne(username: string): Promise<UserEntity | null> {
    const options: FindOneOptions<UserEntity> = {
      where: { username }
    };

    return this.userRepository.findOne(options);
  }

  async createUser(body:any):Promise<any>{
    try {
      const newUser = this.userRepository.create(body)
      return await this.userRepository.save(newUser)
    } catch (error) {
      throw new  BadRequestException('Something was wrong')
    }
     
  }
}

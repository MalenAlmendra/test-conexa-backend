import { Injectable } from '@nestjs/common';

//TODO: este type debe ser un DTO que valide la info del usuario
export type User = any;

@Injectable()
export class UserService {

    //TODO: estos datos deben venir de la base de datos.
    private readonly users = [
        {
          userId: 1,
          username: 'john',
          password: 'changeme',
        },
        {
          userId: 2,
          username: 'maria',
          password: 'guess',
        },
      ];
      
    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
      }
}

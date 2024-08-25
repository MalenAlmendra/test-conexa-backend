import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private userService:UserService){}

    @Post('/create')
    async createUser(@Body() body:any):Promise<any>{
        try {
            return await this.userService.createUser(body)
        } catch (error) {
            throw new BadRequestException('This user can\'t by created.')
        }
    }
}

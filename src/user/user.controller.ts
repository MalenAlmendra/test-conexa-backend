import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto, UserTokenDto } from './dto/user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private userService:UserService){}

    @Post('/create')
    @ApiOperation({ summary: 'This endpoint is for create a user' })
    async createUser(@Body() body:CreateUserDto):Promise<UserTokenDto>{
        try {
            return await this.userService.createUser(body)
        } catch (error) {
            throw new BadRequestException('This user can\'t by created.')
        }
    }
}

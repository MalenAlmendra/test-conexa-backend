import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserTokenDto, CreateUserDto } from 'src/user/dto/user.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {

    constructor(private authService:AuthService){}

    @ApiOperation({ summary: 'This endpoint is for login a user' })
    @Post('/signin')
    async signIn(@Body() signinBody:CreateUserDto):Promise<UserTokenDto>{
        const {username, password, isAdmin} = signinBody
        return await this.authService.signIn(username,password, isAdmin)
    }
}

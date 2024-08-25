import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {

    constructor(private authService:AuthService){}

    @Post('/signin')
    async signIn(@Body() signinBody):Promise<{ access_token: string }>{
        const {username, password, isAdmin} = signinBody
        return await this.authService.signIn(username,password, isAdmin)
    }
}

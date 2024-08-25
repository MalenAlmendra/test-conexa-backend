import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user?.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signIn(username: string, pass: string, isAdmin:boolean): Promise<{ access_token: string }> {
    const user = await this.userService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username, isAdmin:user.isAdmin};
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

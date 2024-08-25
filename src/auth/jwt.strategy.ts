import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  private readonly logger = new Logger(JwtStrategy.name);
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'laputaquetepario'
    });

    const secret = configService.get<string>('config.jwtSecret');
    if (!secret) {
      this.logger.error('JWT secret is not defined in configuration.');
      throw new Error('JWT secret is not defined in configuration.');
    }
  }

  async validate(payload: any) {
    return { id: payload.sub, username: payload.username, isAdmin: payload.isAdmin };
  }
}
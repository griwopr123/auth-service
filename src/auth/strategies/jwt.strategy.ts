import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'super-secret-key',
    });
  }

  async validate(payload: { sub: string }) {
    console.log('JWT payload:', payload, payload.sub);
    console.log('Проверка токена -> payload.sub:', payload.sub);
    const user = await this.usersService.findById(payload.sub);
    console.log('user: ' + user);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
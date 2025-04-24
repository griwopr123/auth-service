import { Injectable, UnauthorizedException, ConflictException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { RegisterDto } from "./dto/register.dto";
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from "./dto/login.dto";
import { createToken } from '../common/utils/token';
import { hashPassword, comparePassword } from "../common/utils/hash";
import { TokenBlacklistService } from '../token-blacklist/token-blacklist.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly blacklist: TokenBlacklistService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {

    const existingUser = await this.usersService.findByEmail(dto.email);
    if (existingUser) {
      throw new ConflictException('Пользователь с таким email уже существует');
    }

    const hashedPassword = await hashPassword(dto.password);
    const user = await this.usersService.createUser({
      email: dto.email,
      password: hashedPassword,
      firstName: dto.firstName,
      lastName: dto.lastName
    });

    return { 
      token: createToken(user.id),
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    };
  }

  async login(dto: LoginDto) {

    const user = await this.usersService.findByEmail(dto.email);
    if (!user || !(await comparePassword(dto.password, user.password))) {
      throw new UnauthorizedException('Неверные учетные данные');
    }


    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);
    console.log(token);

    await this.usersService.recordLogin(user.id);

    return { 
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    };
  }

  async logout(token: string): Promise<{ message: string }> {

    try {

      const cleaned = token?.trim();
      const payload: any = jwt.decode(cleaned);
      const expUnix = payload?.exp;

      if (!expUnix) {
        throw new Error('Invalid token');
      }

      const expiresAt = new Date(expUnix * 1000);
      await this.blacklist.add(cleaned, expiresAt);

      return { message: 'Вы вышли из аккаунта' };

    } catch (e) {
      console.error('Logout error:', e?.message + e);
      return { message: 'Некорректный токен' };
    }
  }
}
import { Controller, Post, Body, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { Public } from '../common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Public()
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  // @Public()
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Request() req) {
    const authHeader: string = req.headers['authorization'] || '';
    const token = authHeader.split(' ')[1];
    // console.log('Logout endpoint -> authHeader:', authHeader);
    // console.log('Logout endpoint -> extracted token:', token, 'length:', token?.length);
    return this.authService.logout(token);
  }
}
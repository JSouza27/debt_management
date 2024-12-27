import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDTO } from './dto/auth-login.dto.ts';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: AuthLoginDTO) {}

  @Post('register')
  async register(@Body() body) {}
}

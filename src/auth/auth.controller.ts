import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: { username: string; password: string }) {
    const { username, password } = body;
    if (this.authService.validateUser(username, password)) {
      return { status: 'Login successful' };
    }

    throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
  }
}

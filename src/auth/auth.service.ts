import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { LoginDto } from '../dto/auth/login.dto';

@Injectable()
export class AuthService {
  private readonly users = [{ username: 'admin', password: 'admin' }];

  constructor(private readonly jwtService: JwtService) {}

  validateUser(username: string, password: string): boolean {
    return this.users.some(
      (user) => user.username === username && user.password === password,
    );
  }

  login(user: LoginDto) {
    const payload = { username: user.username, sub: user.username };
    return {
      access_token: this.jwtService.sign(payload),
      status: 'Login successful',
    };
  }
}

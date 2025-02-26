import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  private readonly users = [{ username: 'admin', password: 'admin' }];

  validateUser(username: string, password: string): boolean {
    return this.users.some(
      (user) => user.username === username && user.password === password,
    );
  }
}

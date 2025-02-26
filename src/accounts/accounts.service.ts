import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountsService {
  private accounts: { [key: string]: number } = {};

  reset(): void {
    this.accounts = {};
  }
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountsService {
  private accounts: { [key: string]: number } = {};

  reset(): void {
    this.accounts = {};
  }

  getBalance(accountId: string): number {
    return this.accounts[accountId] || 0;
  }

  deposit(accountId: string, amount: number): { id: string; balance: number } {
    this.accounts[accountId] = (this.accounts[accountId] || 0) + amount;
    return { id: accountId, balance: this.accounts[accountId] };
  }

  withdraw(
    accountId: string,
    amount: number,
  ): { id: string; balance: number } | null {
    if (!this.accounts[accountId] || this.accounts[accountId] < amount) {
      return null;
    }
    this.accounts[accountId] -= amount;
    return { id: accountId, balance: this.accounts[accountId] };
  }

  transfer(
    originId: string,
    destinationId: string,
    amount: number,
  ): {
    origin: { id: string; balance: number };
    destination: { id: string; balance: number };
  } | null {
    const originAccount = this.withdraw(originId, amount);
    if (!originAccount) {
      return null;
    }

    const destinationAccount = this.deposit(destinationId, amount);
    return { origin: originAccount, destination: destinationAccount };
  }
}

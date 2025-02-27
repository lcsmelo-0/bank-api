import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { AccountType } from '../constants/accounts';
import { AccountsService } from './accounts.service';
import { EventDTO } from '../dto/accounts/event.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('accounts')
@UseGuards(JwtAuthGuard)
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post('reset')
  reset() {
    this.accountsService.reset();
    return { status: 'OK' };
  }

  @Get('balance')
  getBalance(@Query('account_id') accountId: string) {
    const balance = this.accountsService.getBalance(accountId);

    if (balance === 0 && !this.accountsService.getBalance(accountId)) {
      throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
    }
    return balance;
  }

  @Post('event')
  handleEvent(@Body() body: EventDTO) {
    const { type } = body;

    switch (type) {
      case AccountType.DEPOSIT: {
        const { destination, amount } = body;
        return this.accountsService.deposit(destination, amount);
      }

      case AccountType.WITHDRAW: {
        const { origin, amount: withdrawAmount } = body;
        const withdrawResult = this.accountsService.withdraw(
          origin,
          withdrawAmount,
        );

        if (!withdrawResult) {
          throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
        }

        return { origin: withdrawResult };
      }

      case AccountType.TRANSFER: {
        const { origin, destination, amount } = body;
        const transferResult = this.accountsService.transfer(
          origin,
          destination,
          amount,
        );

        if (!transferResult) {
          throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
        }

        return transferResult;
      }

      default:
        throw new HttpException('Invalid event type', HttpStatus.BAD_REQUEST);
    }
  }
}

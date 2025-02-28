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
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AccountType } from '../constants/accounts';
import { DepositDTO } from '../dto/accounts/deposit.dto';
import { TransferDTO } from '../dto/accounts/transfer.dto';
import { WithdrawDTO } from '../dto/accounts/withdraw.dto';
import { AccountsService } from './accounts.service';

@ApiTags('accounts')
@Controller('accounts')
@UseGuards(JwtAuthGuard)
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post('reset')
  @ApiOperation({ summary: 'Reseta a aplicação' })
  reset() {
    this.accountsService.reset();
    return { status: 'OK' };
  }

  @Get('balance')
  @ApiOperation({ summary: 'Realiza um saque bancária' })
  getBalance(@Query('account_id') accountId: string) {
    const balance = this.accountsService.getBalance(accountId);

    if (balance === 0 && !this.accountsService.getBalance(accountId)) {
      throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
    }
    return balance;
  }

  @Post('event')
  @ApiOperation({ summary: 'Realiza uma operação bancária' })
  @ApiBody({
    description: 'Dados da operação',
  })
  handleEvent(@Body() body: DepositDTO | WithdrawDTO | TransferDTO) {
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
        const {
          origin: transferOrigin,
          amount: transferAmount,
          destination: transferDestination,
        } = body;
        const transferResult = this.accountsService.transfer(
          transferOrigin,
          transferDestination,
          transferAmount,
        );
        if (!transferResult) {
          throw new HttpException('Error to transfer', HttpStatus.NOT_FOUND);
        }
        return transferResult;
      }
      default:
        throw new HttpException('Invalid event type', HttpStatus.BAD_REQUEST);
    }
  }
}

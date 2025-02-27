import { AccountType } from '../../constants/accounts';

import { IsEnum, IsString, IsNumber } from 'class-validator';

export class WithdrawDTO {
  @IsEnum(AccountType)
  type: AccountType.WITHDRAW;

  @IsString()
  origin: string;

  @IsNumber()
  amount: number;
}

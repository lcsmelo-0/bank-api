import { AccountType } from '../../constants/accounts';

import { IsEnum, IsString, IsNumber } from 'class-validator';

export class TransferDTO {
  @IsEnum(AccountType)
  type: AccountType.TRANSFER;

  @IsString()
  origin: string;

  @IsNumber()
  amount: number;

  @IsString()
  destination: string;
}

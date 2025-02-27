import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsEnum } from 'class-validator';

import { AccountType } from '../../constants/accounts';

export class DepositDTO {
  @ApiProperty({
    description: 'Tipo de evento (depósito)',
    enum: AccountType,
    example: AccountType.DEPOSIT,
  })
  @IsEnum(AccountType)
  type: AccountType.DEPOSIT;

  @ApiProperty({
    description: 'ID da conta de destino',
    example: '100',
  })
  @IsString()
  destination: string;

  @ApiProperty({
    description: 'Valor do depósito',
    example: 10,
  })
  @IsNumber()
  amount: number;
}

import { AccountType } from '../../constants/accounts';

export class WithdrawDTO {
  type: AccountType.WITHDRAW;
  origin: string;
  amount: number;
}

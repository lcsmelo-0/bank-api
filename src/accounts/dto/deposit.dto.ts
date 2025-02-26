import { AccountType } from '../../constants/accounts';

export class DepositDTO {
  type: AccountType.DEPOSIT;
  destination: string;
  amount: number;
}

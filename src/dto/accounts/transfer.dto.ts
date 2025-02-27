import { AccountType } from '../../constants/accounts';

export class TransferDTO {
  type: AccountType.TRANSFER;
  origin: string;
  amount: number;
  destination: string;
}

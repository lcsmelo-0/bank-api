import { DepositDTO } from './deposit.dto';
import { TransferDTO } from './transfer.dto';
import { WithdrawDTO } from './withdraw.dto';

export type EventDTO = DepositDTO | WithdrawDTO | TransferDTO;

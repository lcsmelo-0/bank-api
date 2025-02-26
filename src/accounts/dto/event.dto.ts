import { DepositDTO } from './deposit.dto';
import { WithdrawDTO } from './withdraw.dto';

export type EventDTO = DepositDTO | WithdrawDTO;

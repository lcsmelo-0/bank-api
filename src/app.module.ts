import { Module } from '@nestjs/common';

import { AccountsModule } from './accounts/accounts.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule, AccountsModule],
})
export class AppModule {}

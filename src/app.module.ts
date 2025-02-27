import { Module } from '@nestjs/common';

import { AccountsModule } from './accounts/accounts.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    AccountsModule,
  ],
})
export class AppModule {}

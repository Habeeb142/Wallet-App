import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { Transaction } from './transaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from 'src/auth/guard/role/role.guard';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction, User]),
    JwtModule.register({
      secret: process.env.SALT,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    TransactionsService,
    UserService,
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
  controllers: [TransactionsController],
})
export class TransactionsModule {}

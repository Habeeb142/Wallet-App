import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { TransactionDto } from './dtos/transaction.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction) private repo: Repository<Transaction>,
    private userService: UserService
  ) {}

  async transact(payload: TransactionDto, user: User): Promise<Transaction> {
    const { recipient, amount } = payload;
    const recipientDetails: User = await this.userService.getUser(recipient)

    const { id: recipientId } = recipientDetails

    // update recipient account
    this.userService.updateAccountBalance(recipient, amount)

    const transaction = this.repo.create({
      ...payload,
      recipient: recipientId,
      sender: null
    });
    return this.repo.save(transaction);
  }


  async transferFund(payload: TransactionDto, user: User): Promise<Transaction> {
    const { recipient, amount } = payload;
    const recipientDetails: User = await this.userService.getUser(recipient)

    const { id: recipientId } = recipientDetails
    const { id: senderId, accountId } = user;
    
    // check if account balance can do transaction
    this.userService.canDoTransaction(accountId, amount)
    // update sender account
    this.userService.updateAccountBalance(accountId, -amount)

    // update recipient account
    this.userService.updateAccountBalance(recipient, amount)

    const transaction = this.repo.create({
      ...payload,
      recipient: recipientId,
      sender: senderId,
    });
    return this.repo.save(transaction);
  }

  transactions(): Promise<[Transaction[], number]> {
    return this.repo.findAndCount();
  }

  async userTransactionHistory(accountId: string): Promise<[Transaction[], number]> {
    const user: User = await this.userService.getUser(accountId)
    const { id } = user
    return this.repo.findAndCount({where: [{ recipient: id }, { sender: id }] });
  }
}

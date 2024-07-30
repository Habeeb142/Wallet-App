import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';

@Injectable()
export class TransactionsService {
    constructor(@InjectRepository(Transaction) private repo: Repository<Transaction>) {}

    async credit(payload: Transaction, user: User): Promise<Transaction> {
        const transaction = await this.repo.create(payload)
        return this.repo.save(transaction)
    }

    async debit(payload: Transaction, user: User): Promise<Transaction> {
        const transaction = await this.repo.create(payload)
        return this.repo.save(transaction)
    }

    transferFund(payload: Transaction, user: User): Promise<Transaction> {
        return
    }

    transactions(): Promise<[Transaction[], number]> {
        return this.repo.findAndCount()
    }
}

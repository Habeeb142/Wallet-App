import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private repo: Repository<User>) {}

    async isUserExist(bvn: string) {
        const user = await this.repo.findOneBy({bvn})
        if(user) throw new ConflictException("User already exist in the system")
        return false
    }

    async getUser(accountId: string): Promise<User> {
        const user = await this.repo.findOneBy({accountId})
        if(!user) throw new NotFoundException("Recipient does not exist in the system")
        return user
    }

    async getAccountBalance(accountId: string): Promise<number> {
        const user = await this.repo.findOneBy({accountId})
        if(!user) throw new NotFoundException("Recipient does not exist in the system")
        const { balance } = user
        return balance
    }

    async canDoTransaction(accountId: string, transactionAmount: number): Promise<boolean> {
        const balance = await this.getAccountBalance(accountId)
        if(balance - transactionAmount < 0) throw new BadRequestException("Insuffiucient balance")
        return true
    }

    async updateAccountBalance(accountId: string, transactionAmount: number): Promise<User> {
        const user = await this.repo.findOneBy({accountId})
        if(!user) throw new NotFoundException("Recipient does not exist in the system")
        const { balance } = user
        user.balance =  balance +  transactionAmount
        return this.repo.save(user)
    }
}

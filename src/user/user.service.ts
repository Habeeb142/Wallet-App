import { ConflictException, Injectable } from '@nestjs/common';
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
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectRepository(User) private repo: Repository<User>, ) {

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SALT,
    });
  }

  async validate(payload: any) {
    
    const { accountId } = payload;
    const user = await this.repo.findOne({ where: { accountId } });
    
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

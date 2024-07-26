import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from 'src/user/user.service';
import { EmailService } from 'src/email/email.service';

@Module({
  imports: [
      TypeOrmModule.forFeature([User]),
      JwtModule.register({
          secret: process.env.SALT,
          signOptions: { expiresIn: '1d' },
        }),
        PassportModule,
  ],
  providers: [JwtStrategy, AuthService, UserService, EmailService],
  controllers: [AuthController]
})
export class AuthModule {}

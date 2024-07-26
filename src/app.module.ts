import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { AuthModule } from './auth/auth.module';
import { ModuleService } from './module/module.service';
import { EmailService } from './email/email.service';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true, envFilePath: '.env'}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.DB_NAME,
      username: process.env.DB_USER_NAME,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: 5432,
      entities: [User],
      synchronize: true,
      // synchronize: false //uncomment when going to production
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, ModuleService, EmailService],
})
export class AppModule {}

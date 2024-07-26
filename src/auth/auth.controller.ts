import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SignUpDto } from './dto/sign-up.dto';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { signUpContent } from 'src/utils/email-content-switch';
import { EmailService } from 'src/email/email.service';
import { SignInDto } from './dto/sign-in.dto';
import { ValidateTokenInterface } from './interface/token.interface';
import { ActivationResponse, LoggedInResponseDto } from 'src/user/dto/responses.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
    constructor(private userService: UserService, private service: AuthService, private emailService: EmailService, private jwtService: JwtService) {}

    @ApiOperation({ summary: 'Sign up a new user' })
    @ApiResponse({ status: 201, description: 'User signed up successfully' , type: User})
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 409, description: 'Conflict User' })
    @Post('/sign-up')
    async signUp(@Body() payload: SignUpDto): Promise<User> {
        const { bvn, email } = payload
        await this.userService.isUserExist(bvn)
        const resp: User = await this.service.signUp(payload)
        const tokenForVerification = this.service.generateConfirmationToken({ email, id: resp.id })
        const { subject, html } = signUpContent(payload, tokenForVerification, resp.id)
        await this.emailService.sendMail(email, subject, html)
        return resp
    }

    @ApiOperation({ summary: 'Sign in a user' })
    @ApiResponse({ status: 201, description: 'User signed in successfully' , type: LoggedInResponseDto})
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 401, description: 'UnAuthorized Request' })
    @ApiResponse({ status: 403, description: 'Forbidden Request' })
    @Post('/sign-in')
    signIn(@Body() payload: SignInDto): Promise<LoggedInResponseDto> {
        return this.service.signIn(payload)
    }


    @ApiOperation({ summary: 'Activate a just signed up user' })
    @ApiResponse({ status: 201, description: 'User Activated in successfully' , type: ActivationResponse})
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 403, description: 'Forbidden Request' })
    @Get('/activate/:email')
    async activateUser(@Param() param:Partial<SignInDto>, @Query() query:Partial<ValidateTokenInterface>): Promise<ActivationResponse> {
        return this.service.activateUser(param, query)
    }
}

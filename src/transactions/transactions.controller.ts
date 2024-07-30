import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from 'src/auth/guard/role/role.decorator';
import { Role } from 'src/auth/roles.enum';
import { User } from 'src/user/user.entity';
import { Transaction } from './transaction.entity';

@Controller('transactions')
export class TransactionsController {
    constructor(private service: TransactionsService) {}

    @ApiOperation({ summary: 'Funding an account' })
    @ApiResponse({ status: 201, description: 'Account Funded successfully', type: Transaction})
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 401, description: 'Unauthorized request' })
    @ApiResponse({ status: 403, description: 'Forbidden resource' })
    @Roles(Role.User, Role.Admin)
    @Post('credit')
    // create(@Body() payload: CreateTaskDto, @Request() req: any): Promise<Task> { //below i intentionally set the property i will need from request, u can console log req using type any to get lists of what is accessible
    credit(@Body() payload: Transaction, @Request() req: { user: User }): Promise<Transaction> {
        return this.service.credit(payload, req.user)
         //  update in wallet
    }


    @ApiOperation({ summary: 'Debiting from an account' })
    @ApiResponse({ status: 201, description: 'Account Debited successfully' , type: Transaction})
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 401, description: 'Unauthorized request' })
    @ApiResponse({ status: 403, description: 'Forbidden resource' })
    @Roles(Role.User, Role.Admin)
    @Post('debit')
    // create(@Body() payload: CreateTaskDto, @Request() req: any): Promise<Task> { //below i intentionally set the property i will need from request, u can console log req using type any to get lists of what is accessible
    debit(@Body() payload: Transaction, @Request() req: { user: User }): Promise<Transaction> {
        return this.service.debit(payload, req.user)
        //  update in wallet
    }

    @ApiOperation({ summary: 'Fund transfer from an account' })
    @ApiResponse({ status: 201, description: 'Account Debited successfully' , type: Transaction})
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 401, description: 'Unauthorized request' })
    @ApiResponse({ status: 403, description: 'Forbidden resource' })
    @Roles(Role.User, Role.Admin)
    @Post('transfer')
    // create(@Body() payload: CreateTaskDto, @Request() req: any): Promise<Task> { //below i intentionally set the property i will need from request, u can console log req using type any to get lists of what is accessible
    transferFund(@Body() payload: Transaction, @Request() req: { user: User }): Promise<Transaction> {
        return this.service.transferFund(payload, req.user)
         //  update in wallet
    }

    @ApiOperation({ summary: 'Debiting from an account' })
    @ApiResponse({ status: 201, description: 'Account Debited successfully' , type: Transaction})
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 401, description: 'Unauthorized request' })
    @ApiResponse({ status: 403, description: 'Forbidden resource' })
    @Roles(Role.User, Role.Admin)
    @Get('transactions')
    // create(@Body() payload: CreateTaskDto, @Request() req: any): Promise<Task> { //below i intentionally set the property i will need from request, u can console log req using type any to get lists of what is accessible
    transactions(): Promise<[Transaction[], number]> {
        return this.service.transactions()
        //  update in wallet
    }

}

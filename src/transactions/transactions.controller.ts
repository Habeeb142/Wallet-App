import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from 'src/auth/guard/role/role.decorator';
import { Role } from 'src/auth/roles.enum';
import { User } from 'src/user/user.entity';
import { Transaction } from './transaction.entity';
import { TransType } from './trans-type.enum';
import { TransactionDto } from './dtos/transaction.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth/jwt-auth.guard';

@ApiBearerAuth()
@Controller('transactions')
@UseGuards(JwtAuthGuard)

export class TransactionsController {
    constructor(private service: TransactionsService) {}

    @ApiOperation({ summary: 'Funding an account' })
    @ApiResponse({ status: 201, description: 'Account Funded successfully', type: Transaction})
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 401, description: 'Unauthorized request' })
    @ApiResponse({ status: 403, description: 'Forbidden resource' })
    @Roles(Role.User, Role.Admin)
    @Post()
    // create(@Body() payload: CreateTaskDto, @Request() req: any): Promise<Task> { //below i intentionally set the property i will need from request, u can console log req using type any to get lists of what is accessible
    transaction(@Body() payload: TransactionDto, @Request() req: { user: User }): Promise<Transaction> {

        const { transType: transactionType } = payload
        const transaction = this.service.transact(payload, req.user)
        // const transaction = transactionType == TransType.Credit ? this.service.credit(payload, req.user) : this.service.debit(payload, req.user)
         //  update in wallet
         return transaction
    }

    @ApiOperation({ summary: 'Fund transfer from an account' })
    @ApiResponse({ status: 201, description: 'Account Debited successfully' , type: Transaction})
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 401, description: 'Unauthorized request' })
    @ApiResponse({ status: 403, description: 'Forbidden resource' })
    @Roles(Role.User, Role.Admin)
    @Post('transfer')
    // create(@Body() payload: CreateTaskDto, @Request() req: any): Promise<Task> { //below i intentionally set the property i will need from request, u can console log req using type any to get lists of what is accessible
    transferFund(@Body() payload: TransactionDto, @Request() req: { user: User }): Promise<Transaction> {
        return this.service.transferFund(payload, req.user)
         //  update in wallet
    }

    
    @ApiOperation({ summary: 'Get all transactions' })
    @ApiResponse({ status: 201, description: 'Request successfully' , type: Transaction})
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 401, description: 'Unauthorized request' })
    @ApiResponse({ status: 403, description: 'Forbidden resource' })
    @Roles(Role.User, Role.Admin)
    @Get('')
    // create(@Body() payload: CreateTaskDto, @Request() req: any): Promise<Task> { //below i intentionally set the property i will need from request, u can console log req using type any to get lists of what is accessible
    userTransactionHistory(@Request() req: { user: User }): Promise<[Transaction[], number]> {
        return this.service.userTransactionHistory(req.user.accountId)
        //  update in wallet
    }

}

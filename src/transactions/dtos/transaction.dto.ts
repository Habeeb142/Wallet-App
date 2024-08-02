import { ApiProperty } from '@nestjs/swagger';
import { TransType } from '../trans-type.enum';
import { IsDecimal, IsEnum, IsString } from 'class-validator';

export class TransactionDto {
  @ApiProperty({ description: 'This is the amount invloved in the transaction', example: "300.00"})
  @IsDecimal()
  amount: number;

  @ApiProperty({ description: 'This is the transaction type which can be DEBIT or CREDIT as thew case may be', example: 'CREDIT' })
  @IsString()
  transType: TransType;

  @ApiProperty({ description: 'This is the transaction description' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'This is the transaction recipient account Id' })
  @IsString()
  recipient: string;

  @ApiProperty({ description: 'This is the transaction sender name', example: 'Mustapha Habeb' })
  @IsString()
  senderName: string;

  // @OneToMany(() => Task, (task) => task.assignee)
  // task: Task;

}
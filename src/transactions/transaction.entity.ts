import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TransType } from './trans-type.enum';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'This is the amount invloved in the transaction', example: '300.00' })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @ApiProperty({ description: 'This is the transaction type which can be DEBIT or CREDIT as thew case may be', example: 'CREDIT' })
  @Column({
    type: 'enum',
    enum: TransType,
  })
  transType: TransType;

  @ApiProperty({ description: 'This is the transaction description' })
  @Column({default: ''})
  description: string;

  // to be updated when joined to User
  @ApiProperty({ description: 'This is the transaction recipient account Id' })
  @Column()
  recipient: string;

  @ApiProperty({ description: 'This is the transaction sender name', example: 'Mustapha Habeb' })
  @Column()
  senderName: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateCreated: Date;

  // one to many to sender and recipiepent account number

  // @OneToMany(() => Task, (task) => task.assignee)
  // task: Task;

}
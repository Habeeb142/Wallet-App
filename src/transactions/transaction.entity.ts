import { BeforeInsert, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TransType } from './trans-type.enum';
import { User } from 'src/user/user.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({
    type: 'enum',
    enum: TransType,
  })
  transType: TransType;

  @Column({default: ''})
  description: string;

  @Column()
  senderName: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateCreated: Date;

  // one to many to sender and recipiepent account number

  @ManyToOne(() => User, (user) => user.senderTransaction, { eager: true } )
  sender: number;

  @ManyToOne(() => User, (user) => user.recipientTransaction, { eager: true })
  recipient: number;

}
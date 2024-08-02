import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../auth/roles.enum';
import { Transaction } from 'src/transactions/transaction.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  accountId: string;

  @Column({ type: 'bigint', unique: true })
  bvn: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({default: 0})
  balance: number;

  @Column({
      type: 'enum',
      enum: Role,
      default: Role.User,
    })
    role: Role;
 

  @Column({ default: false })
  activate: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateCreated: Date;

  @OneToMany(() => Transaction, (transaction) => transaction.sender)
  senderTransaction: Transaction;

  @OneToMany(() => Transaction, (transaction) => transaction.recipient)
  recipientTransaction: Transaction;

  @BeforeInsert()
  generateUniqueId() {
    this.accountId = this.generate10DigitId();
  }

  private generate10DigitId(): string {
    const timestamp = Date.now().toString().slice(-10);
    const random = Math.floor(1000000000 + Math.random() * 9000000000).toString().slice(-10);
    return (timestamp + random).slice(-10);
  }
}

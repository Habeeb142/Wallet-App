import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../auth/roles.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bigint', unique: true })
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

  // @OneToMany(() => Task, (task) => task.assignee)
  // task: Task;

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

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import User from 'Modules/Users/Infra/TypeORM/Entities/User';
import Currency from 'Modules/Currencies/Infra/TypeORM/Entities/Currency';

@Entity('wallets')
class Wallet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  alias: string;

  @Column({ type: 'decimal', default: 0 })
  balance: string;

  @Column('uuid')
  user_id: string;

  @Column('uuid')
  currency_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, user => user.wallets)
  user: User;

  @ManyToOne(() => Currency, currency => currency.wallets)
  currency: Currency;
}

export default Wallet;

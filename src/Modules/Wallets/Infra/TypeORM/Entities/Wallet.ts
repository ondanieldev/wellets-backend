import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import User from 'Modules/Users/Infra/TypeORM/Entities/User';
import Currency from 'Modules/Currencies/Infra/TypeORM/Entities/Currency';
import Transaction from 'Modules/Transactions/Infra/TypeORM/Entities/Transaction';
import Conversion from 'Modules/Conversions/Infra/TypeORM/Entities/Conversion';

@Entity('wallets')
class Wallet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  alias: string;

  @Column({ type: 'decimal', default: 0 })
  balance: number;

  @Column('uuid')
  user_id: string;

  @Column('uuid')
  currency_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, user => user.wallets)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Currency, currency => currency.wallets)
  @JoinColumn({ name: 'currency_id' })
  currency: Currency;

  @OneToMany(() => Transaction, transaction => transaction.wallet)
  transactions: Transaction[];

  @OneToMany(() => Conversion, conversion => conversion.from_wallet)
  from_conversions: Conversion[];

  @OneToMany(() => Conversion, conversion => conversion.to_wallet)
  to_conversions: Conversion[];
}

export default Wallet;

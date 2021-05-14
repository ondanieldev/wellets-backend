import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Wallet from 'Modules/Wallets/Infra/TypeORM/Entities/Wallet';
import User from 'Modules/Users/Infra/TypeORM/Entities/User';

@Entity('currencies')
class Currency {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 4 })
  acronym: string;

  @Column()
  alias: string;

  @Column()
  format: string;

  @Column('decimal')
  dollar_rate: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column('uuid')
  user_id?: string;

  @ManyToOne(() => User, user => user.custom_currencies)
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @OneToMany(() => Wallet, wallet => wallet.currency)
  wallets: Wallet[];
}

export default Currency;

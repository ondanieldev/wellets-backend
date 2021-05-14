import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import Wallet from 'Modules/Wallets/Infra/TypeORM/Entities/Wallet';
import Currency from 'Modules/Currencies/Infra/TypeORM/Entities/Currency';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  token?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Wallet, wallet => wallet.user)
  wallets: Wallet[];

  @OneToMany(() => Currency, currency => currency.user)
  custom_currencies: Currency[];
}

export default User;

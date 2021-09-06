import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Currency from 'Modules/Currencies/Infra/TypeORM/Entities/Currency';
import User from 'Modules/Users/Infra/TypeORM/Entities/User';

@Entity('currency_preferences')
class CurrencyPreference {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  favorite: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column('uuid')
  user_id: string;

  @Column('uuid')
  currency_id: string;

  @ManyToOne(() => User, user => user.currency_preferences)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Currency, currency => currency.user_preferences)
  @JoinColumn({ name: 'currency_id' })
  currency: Currency;
}

export default CurrencyPreference;

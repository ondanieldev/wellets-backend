import Wallet from 'Modules/Wallets/Infra/TypeORM/Entities/Wallet';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('conversions')
class Conversion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  from_wallet_id: string;

  @Column('uuid')
  to_wallet_id: string;

  @Column({ type: 'decimal', default: 0 })
  static_rate: number;

  @Column({ type: 'decimal', default: 0 })
  percentual_rate: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Wallet, wallet => wallet.from_conversions)
  @JoinColumn({ name: 'from_wallet_id' })
  from_wallet: Wallet;

  @ManyToOne(() => Wallet, wallet => wallet.to_conversions)
  @JoinColumn({ name: 'to_wallet_id' })
  to_wallet: Wallet;
}

export default Conversion;

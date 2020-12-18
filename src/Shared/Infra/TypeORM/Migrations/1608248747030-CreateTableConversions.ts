import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateTableConversions1608248747030
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'conversions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'from_wallet_id',
            type: 'uuid',
          },
          {
            name: 'to_wallet_id',
            type: 'uuid',
          },
          {
            name: 'static_rate',
            type: 'decimal',
            default: 0,
          },
          {
            name: 'percentual_rate',
            type: 'decimal',
            default: 0,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'conversions',
      new TableForeignKey({
        name: 'from_wallet_id',
        columnNames: ['from_wallet_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'wallets',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'conversions',
      new TableForeignKey({
        name: 'to_wallet_id',
        columnNames: ['to_wallet_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'wallets',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('conversions', 'to_wallet_id');
    await queryRunner.dropForeignKey('conversions', 'from_wallet_id');
    await queryRunner.dropTable('conversions');
  }
}

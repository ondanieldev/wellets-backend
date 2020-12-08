import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateTableCurrencies1607395618164
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'currencies',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'acronym',
            type: 'varchar',
            length: '3',
            isUnique: true,
          },
          {
            name: 'alias',
            type: 'varchar',
          },
          {
            name: 'format',
            type: 'varchar',
          },
          {
            name: 'dollar_rate',
            type: 'decimal',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('currencies');
  }
}

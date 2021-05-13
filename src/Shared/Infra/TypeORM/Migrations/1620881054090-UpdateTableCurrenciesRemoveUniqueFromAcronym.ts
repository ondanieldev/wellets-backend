import { MigrationInterface, QueryRunner, TableUnique } from 'typeorm';

export default class UpdateTableCurrenciesRemoveUniqueFromAcronym1620881054090
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE currencies ALTER COLUMN acronym TYPE varchar(4);',
    );

    const uniqueConstraint = await queryRunner.query(
      "SELECT conname FROM pg_constraint WHERE conrelid = 'currencies'::regclass AND contype = 'u';",
    );

    await queryRunner.dropUniqueConstraint(
      'currencies',
      uniqueConstraint[0].conname,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createUniqueConstraint(
      'currencies',
      new TableUnique({
        name: 'acronym_unique',
        columnNames: ['acronym'],
      }),
    );
  }
}

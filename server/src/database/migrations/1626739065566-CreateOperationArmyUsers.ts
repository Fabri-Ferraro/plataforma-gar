import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateOperationArmyUsers1626739065566
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'operation_army_users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'id_operation',
            type: 'uuid',
          },
          {
            name: 'id_army',
            type: 'uuid',
          },
          {
            name: 'id_user',
            type: 'uuid',
          },
          {
            name: 'inscription',
            type: 'int',
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'status',
            type: 'varchar',
            default: "'A'",
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
    await queryRunner.dropTable('operation_army_users');
  }
}

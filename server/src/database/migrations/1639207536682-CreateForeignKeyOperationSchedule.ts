import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class CreateForeignKeyOperationSchedule1639207536682 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'operation_schedule',
      new TableForeignKey({
        name: 'operation_schedule-id_operation',
        columnNames: ['id_operation'],
        referencedColumnNames: ['id'],
        referencedTableName: 'operations',
        onDelete: `SET NULL`,
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('operation_schedule', 'operation_schedule-id_operation');
  }

}

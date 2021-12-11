import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class CreateForeignKeys1638839744300 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'armies',
      new TableForeignKey({
        name: 'armies-id_operation',
        columnNames: ['id_operation'],
        referencedColumnNames: ['id'],
        referencedTableName: 'operations',
        onDelete: `SET NULL`,
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'operation_army_users',
      new TableForeignKey({
        name: 'operation_army_users-operations',
        columnNames: ['id_operation'],
        referencedColumnNames: ['id'],
        referencedTableName: 'operations',
        onDelete: `SET NULL`,
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'operation_army_users',
      new TableForeignKey({
        name: 'operation_army_users-armies',
        columnNames: ['id_army'],
        referencedColumnNames: ['id'],
        referencedTableName: 'armies',
        onDelete: `SET NULL`,
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'operation_army_users',
      new TableForeignKey({
        name: 'operation_army_users-users',
        columnNames: ['id_user'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: `SET NULL`,
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('monitorias', 'armies-id_operation');
    await queryRunner.dropForeignKey('monitorias', 'operation_army_users-operations');
    await queryRunner.dropForeignKey('monitorias', 'operation_army_users-armies');
    await queryRunner.dropForeignKey('monitorias', 'operation_army_users-users');
  }

}

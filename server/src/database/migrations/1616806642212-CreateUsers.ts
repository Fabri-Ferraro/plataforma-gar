import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUsers1616806642212 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'nickname',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'birth_date',
            type: 'timestamp',
          },
          {
            name: 'avatar',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'team',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'contact_phone',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'emergency_contact_name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'emergency_contact_phone',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'blood_type',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'password',
            type: 'varchar',
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
    await queryRunner.dropTable('users');
  }
}

import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddRoleColumnToUserTableMigration1668019131170 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'role',
        type: 'enum',
        enum: ['ADMIN', 'USER'],
        default: '"USER"'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("user", "role");
  }

}

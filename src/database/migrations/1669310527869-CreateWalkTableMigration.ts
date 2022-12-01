import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateWalkTableMigration1669310527869 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
              name: 'walk',
              columns: [
                  {
                      name: 'id',
                      type: 'int',
                      isPrimary: true,
                      isGenerated: true,
                      generationStrategy: 'increment',
                  },
                  {
                      name: 'user_id',
                      type: 'int',
                  },
                  {
                      name: 'dog_id',
                      type: 'int',
                  },
                  {
                      name: 'date',
                      type: 'datetime',
                  },
              ],
          }),
          true,
        );

        await queryRunner.createForeignKey(
          'walk',
          new TableForeignKey({
              name: 'FK_walk_user_id',
              columnNames: ['user_id'],
              referencedColumnNames: ['id'],
              referencedTableName: 'user',
              onDelete: 'CASCADE',
          }),
        );

        await queryRunner.createForeignKey(
          'walk',
          new TableForeignKey({
              name: 'FK_walk_dog_id',
              columnNames: ['dog_id'],
              referencedColumnNames: ['id'],
              referencedTableName: 'dog',
              onDelete: 'CASCADE',
          }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('walk', 'FK_walk_dog_id');
        await queryRunner.dropForeignKey('walk', 'FK_walk_user_id');

        await queryRunner.dropTable('walk');
    }
}

import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class AddAdoptedColumnToDogTableMigration1665815261031 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'dog',
            new TableColumn({
                name: 'adopted',
                type: 'boolean',
                default: false,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('dog', 'adopted');
    }

}

import { MigrationInterface, QueryRunner } from "typeorm"

export class RemoveAdoptionTypeColumnFromDogTableMigration1665816041617 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('dog', 'adoption_type');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

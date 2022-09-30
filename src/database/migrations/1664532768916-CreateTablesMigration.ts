import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm"

export class CreateTablesMigration1664532768916 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'user',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'name',
                        type: 'nvarchar(50)',
                    },
                    {
                        name: 'email',
                        type: 'varchar(50)',
                    },
                    {
                        name: 'password',
                        type: 'nvarchar(50)',
                    },
                    {
                        name: 'image_url',
                        type: 'text',
                    },
                ],
            }),
            true,
        );

        await queryRunner.createIndex(
            'user',
            new TableIndex({
                name: 'UQ_user_email',
                columnNames: ['email'],
                isUnique: true,
            }),
        );
        await queryRunner.createTable(
            new Table({
                name: 'dog',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'name',
                        type: 'nvarchar(50)',
                    },
                    {
                        name: 'breed',
                        type: 'nvarchar(50)',
                    },
                    {
                        name: 'gender',
                        type: 'enum',
                        enum: ['KAN', 'SZUKA']
                    },
                    {
                        name: 'castrated',
                        type: 'boolean',
                    },
                    {
                        name: 'color',
                        type: 'nvarchar(50)',
                    },
                    {
                        name: 'dirth_date',
                        type: 'date',
                    },
                    {
                        name: 'description',
                        type: 'text',
                    },
                    {
                        name: 'adoption_type',
                        type: 'enum',
                        enum: ['IDEIGLENES', 'VÉGLEGES']
                    },
                    {
                        name: 'image_url',
                        type: 'text',
                    },
                ],
            }),
            true,
        );

        await queryRunner.createTable(
            new Table({
                name: 'adoption',
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
                        type: 'date',
                    },
                ],
            }),
            true,
        );

        await queryRunner.createTable(
            new Table({
                name: 'apply',
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
                        name: 'introduction',
                        type: 'text',
                    },
                    {
                        name: 'accepted',
                        type: 'boolean',
                        isNullable: true,
                    },
                ],
            }),
            true,
        );

        await queryRunner.createForeignKey(
            'adoption',
            new TableForeignKey({
                name: 'FK_adoption_user_id',
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'user',
                onDelete: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            'adoption',
            new TableForeignKey({
                name: 'FK_adoption_dog_id',
                columnNames: ['dog_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'dog',
                onDelete: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            'apply',
            new TableForeignKey({
                name: 'FK_apply_user_id',
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'user',
                onDelete: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            'apply',
            new TableForeignKey({
                name: 'FK_apply_dog_id',
                columnNames: ['dog_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'dog',
                onDelete: 'CASCADE',
            }),
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('apply', 'FK_apply_dog_id');
        await queryRunner.dropForeignKey('apply', 'FK_apply_user_id');
        await queryRunner.dropForeignKey('adoption', 'FK_adoption_dog_id');
        await queryRunner.dropForeignKey('adoption', 'FK_adoption_user_id');

        await queryRunner.dropTable('apply');
        await queryRunner.dropTable('adoption');
        await queryRunner.dropTable('dog');
        await queryRunner.dropIndex('user', 'UQ_user_email');
        await queryRunner.dropTable('user');
    }
}

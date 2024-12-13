import { MigrationInterface, QueryRunner } from "typeorm";

export class Stock1731638466385 implements MigrationInterface {
    name = 'Stock1731638466385'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stock" ADD "warehouses_id" uuid`);
        await queryRunner.query(`ALTER TABLE "stock" ADD CONSTRAINT "FK_8a2e3075eadcac9919e6136158a" FOREIGN KEY ("warehouses_id") REFERENCES "warehouse"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stock" DROP CONSTRAINT "FK_8a2e3075eadcac9919e6136158a"`);
        await queryRunner.query(`ALTER TABLE "stock" DROP COLUMN "warehouses_id"`);
    }

}

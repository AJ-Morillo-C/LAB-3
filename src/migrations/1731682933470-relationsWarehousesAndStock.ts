import { MigrationInterface, QueryRunner } from "typeorm";

export class RelationsWarehousesAndStock1731682933470 implements MigrationInterface {
    name = 'RelationsWarehousesAndStock1731682933470'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stock" DROP COLUMN "quanty"`);
        await queryRunner.query(`ALTER TABLE "stock" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "warehouse" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "stock" ADD "quantity" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "stock" ADD "warehouse_id" uuid`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "UQ_22cc43e9a74d7498546e9a63e77"`);
        await queryRunner.query(`ALTER TABLE "warehouse" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "stock" ADD CONSTRAINT "FK_b2be25bd3e78455fe801c45e892" FOREIGN KEY ("warehouse_id") REFERENCES "warehouse"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stock" DROP CONSTRAINT "FK_b2be25bd3e78455fe801c45e892"`);
        await queryRunner.query(`ALTER TABLE "warehouse" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "UQ_22cc43e9a74d7498546e9a63e77" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "stock" DROP COLUMN "warehouse_id"`);
        await queryRunner.query(`ALTER TABLE "stock" DROP COLUMN "quantity"`);
        await queryRunner.query(`ALTER TABLE "warehouse" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "stock" ADD "description" character varying`);
        await queryRunner.query(`ALTER TABLE "stock" ADD "quanty" integer NOT NULL`);
    }

}

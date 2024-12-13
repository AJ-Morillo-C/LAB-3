import { MigrationInterface, QueryRunner } from "typeorm";

export class PurchasesAndPaymentMethods1732213015146 implements MigrationInterface {
    name = 'PurchasesAndPaymentMethods1732213015146'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "purchase" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, "status" character varying NOT NULL, "payment_method_id" uuid, CONSTRAINT "PK_86cc2ebeb9e17fc9c0774b05f69" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "paymentMethod" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, "payment_method" character varying NOT NULL, CONSTRAINT "PK_bc8aad15eec6d1914a58089008f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "purchase" ADD CONSTRAINT "FK_2d44d35774ef22e1a580ca062b2" FOREIGN KEY ("payment_method_id") REFERENCES "paymentMethod"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchase" DROP CONSTRAINT "FK_2d44d35774ef22e1a580ca062b2"`);
        await queryRunner.query(`DROP TABLE "paymentMethod"`);
        await queryRunner.query(`DROP TABLE "purchase"`);
    }

}

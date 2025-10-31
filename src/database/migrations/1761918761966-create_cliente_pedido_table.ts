import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateClientePedidoTable1761918761966 implements MigrationInterface {
    name = 'CreateClientePedidoTable1761918761966'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categorias" RENAME COLUMN "estado" TO "descripcion"`);
        await queryRunner.query(`CREATE TABLE "clientes" ("id" SERIAL NOT NULL, "nombre_completo" character varying NOT NULL, "dni" character varying NOT NULL, "telefono" character varying NOT NULL, CONSTRAINT "PK_d76bf3571d906e4e86470482c08" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pedidos" ("id" SERIAL NOT NULL, "fecha" character varying NOT NULL, "estado" integer NOT NULL, "observaciones" character varying NOT NULL, "clienteId" integer, CONSTRAINT "PK_ebb5680ed29a24efdc586846725" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pedido_productos" ("id" SERIAL NOT NULL, "cantidad" integer NOT NULL, "precio_unitario" integer NOT NULL, "pedidoId" integer, "productoId" integer, CONSTRAINT "PK_7a85762ff09341b06a4456015c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "productos" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "productos" DROP COLUMN "descripcion"`);
        await queryRunner.query(`ALTER TABLE "productos" DROP COLUMN "estado"`);
        await queryRunner.query(`ALTER TABLE "categorias" DROP COLUMN "descripcion"`);
        await queryRunner.query(`ALTER TABLE "categorias" ADD "descripcion" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "productos" DROP COLUMN "precio"`);
        await queryRunner.query(`ALTER TABLE "productos" ADD "precio" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pedidos" ADD CONSTRAINT "FK_485346a40b61bb8ae3a98f5400c" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pedido_productos" ADD CONSTRAINT "FK_bc3c920a34df83c6809f6c1df13" FOREIGN KEY ("pedidoId") REFERENCES "pedidos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pedido_productos" ADD CONSTRAINT "FK_9a74da9451f7e82263421351df2" FOREIGN KEY ("productoId") REFERENCES "productos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pedido_productos" DROP CONSTRAINT "FK_9a74da9451f7e82263421351df2"`);
        await queryRunner.query(`ALTER TABLE "pedido_productos" DROP CONSTRAINT "FK_bc3c920a34df83c6809f6c1df13"`);
        await queryRunner.query(`ALTER TABLE "pedidos" DROP CONSTRAINT "FK_485346a40b61bb8ae3a98f5400c"`);
        await queryRunner.query(`ALTER TABLE "productos" DROP COLUMN "precio"`);
        await queryRunner.query(`ALTER TABLE "productos" ADD "precio" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "categorias" DROP COLUMN "descripcion"`);
        await queryRunner.query(`ALTER TABLE "categorias" ADD "descripcion" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "productos" ADD "estado" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "productos" ADD "descripcion" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "productos" ADD "image" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "pedido_productos"`);
        await queryRunner.query(`DROP TABLE "pedidos"`);
        await queryRunner.query(`DROP TABLE "clientes"`);
        await queryRunner.query(`ALTER TABLE "categorias" RENAME COLUMN "descripcion" TO "estado"`);
    }

}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablePairs1688411343000 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS pairs (
      pair TEXT NOT NULL PRIMARY KEY UNIQUE,
      token0 TEXT NOT NULL,
      token1 TEXT NOT NULL
    )
    `);
  }

  async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE pairs`);
  }
}

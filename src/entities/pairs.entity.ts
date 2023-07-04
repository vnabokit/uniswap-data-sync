import { Entity, Column, PrimaryColumn, Unique } from 'typeorm';
@Entity()
@Unique(['pair'])
export class Pairs {
  @PrimaryColumn('text')
  pair: string;
  @Column('text', { nullable: false })
  token0: string;
  @Column('text', { nullable: false })
  token1: string;
}

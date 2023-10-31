import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('produtos')
export class Produto extends BaseEntity{
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public descricao: string;

  @Column()
  public qtdade: string;

  @Column({ type: 'numeric', precision: 7, scale: 2 })
  public preco: number;

}

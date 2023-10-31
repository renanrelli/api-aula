import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Permissao } from "./Permissao";

@Entity("paginas")
export class Pagina extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public nome: string;

  @OneToMany(() => Permissao, (permissao) => permissao.pagina)
  public permissao: Promise<Permissao[]>;
}

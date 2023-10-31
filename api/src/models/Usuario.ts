import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Permissao } from "./Permissao";

@Entity("usuarios")
export class Usuario extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public nome: string;

  @Column({ select: false })
  public senha: string;

  @Column({ unique: true })
  public email: string;

  @OneToMany(() => Permissao, (permissao) => permissao.usuario)
  public permissao: Promise<Permissao[]>;
}

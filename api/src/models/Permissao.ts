import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Pagina } from "./Pagina";
import { Usuario } from "./Usuario";

@Entity("permissao")
export class Permissao extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    type: "char",
  })
  public tipo: string;

  @Column({
    type: "int",
  })
  public idUsuario: number;

  @Column({
    type: "int",
  })
  public idPagina: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.permissao, { eager: true })
  @JoinColumn({ name: "idUsuario" })
  public usuario: Usuario;

  @ManyToOne(() => Pagina, (pagina) => pagina.permissao, { eager: true })
  @JoinColumn({ name: "idPagina" })
  public pagina: Pagina;
}

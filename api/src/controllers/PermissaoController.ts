import { Response, Request } from "express";
import { Pagina } from "../models/Pagina";
import { Usuario } from "../models/Usuario";
import { Permissao } from "../models/Permissao";
import { log } from "console";

export class PermissaoController {
  async list(req: Request, res: Response): Promise<Response> {
    let idUsuario: number = parseInt(req.query.idUsuario + "");
    console.log(idUsuario);

    let permissoes: Permissao[] = await Permissao.findBy({
      idUsuario: idUsuario ? idUsuario : undefined,
    });
    return res.status(200).json(permissoes);
  }

  async create(req: Request, res: Response): Promise<Response> {
    let body = req.body;

    let permissao: Permissao = await Permissao.create({
      tipo: body.tipo,
      idPagina: body.idPagina,
      idUsuario: body.idUsuario,
    }).save();

    return res.status(200).json(permissao);
  }

  async update(req: Request, res: Response): Promise<Response> {
    let body = req.body;
    let id = Number(req.params.id);

    let permissao: Permissao | null = await Permissao.findOneBy({
      id: id,
    });
    if (permissao) {
      permissao.idUsuario = body.idUsuario;
      permissao.idPagina = body.idPagina;
      permissao.tipo = body.tipo;
      await permissao.save();
      return res.status(200).json(permissao);
    } else return res.status(401).json({ message: "Permissão não encontrada" });
  }
  async delete(req: Request, res: Response): Promise<Response> {
    let id = Number(req.params.id);

    let permissao: Permissao | null = await Permissao.findOneBy({ id });
    if (!permissao) {
      return res.status(422).json({ error: "Página não encontrado! " });
    }

    await permissao.remove();

    return res.status(200).json();
  }
}

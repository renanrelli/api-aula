import { ILike } from "typeorm";
import { Pagina } from "../models/Pagina";
import { Request, Response } from "express";

export class PaginasController {
  async list(req: Request, res: Response): Promise<Response> {
    let nome = req.query.nome;

    let paginas: Pagina[] = await Pagina.findBy({
      nome: nome ? ILike(`${nome}`) : undefined,
    });
    return res.status(200).json(paginas);
  }

  async find(req: Request, res: Response): Promise<Response> {
    let pagina = res.locals.pagina;
    return res.status(200).json(pagina);
  }

  async create(req: Request, res: Response): Promise<Response> {
    let body = req.body;

    let pagina: Pagina = await Pagina.create({
      nome: body.nome,
    }).save();

    return res.status(200).json(pagina);
  }

  async update(req: Request, res: Response): Promise<Response> {
    let id = Number(req.params.id);
    let pagina: Pagina | null = await Pagina.findOneBy({ id });
    if (!pagina) {
      return res.status(422).json({ error: "Pagina não encontrado! " });
    }
    let body = req.body;

    (pagina.nome = body.nome), await pagina.save();

    return res.status(200).json(pagina);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    let id = Number(req.params.id);

    let pagina: Pagina | null = await Pagina.findOneBy({ id });
    if (!pagina) {
      return res.status(422).json({ error: "Página não encontrado! " });
    }

    await pagina.remove();

    return res.status(200).json();
  }
}

import { Produto } from "../models/Produto";
import { Request, Response } from 'express';


export class ProdutosController{

  async list(req: Request, res: Response):Promise<Response> {
    let produtos: Produto[] = await Produto.find()
    return res.status(200).json(produtos)
  }

  async find (req: Request, res: Response): Promise<Response> {
    let id = Number(req.params.id)

    let produto: Produto|null = await Produto.findOneBy({id})
    if(! produto){
      return res.status(422).json({ error: 'Produto não encontrado! '})
    }

    return res.status(200).json(produto);
  }

  async create(req: Request, res: Response): Promise<Response>{
    let body = req.body

    let produto: Produto = await Produto.create({
      descricao: body.descricao,
      qtdade: body.qtdade,
      preco: body.preco
    }).save()
    return res.status(200).json(produto)
  }

  async update (req: Request, res: Response): Promise<Response>{
    let body = req.body
    let id = Number(req.params.id)

    let produto: Produto|null = await Produto.findOneBy({id})
    if(! produto){
      return res.status(422).json({ error: 'Produto não encontrado! '})
    }

    produto.descricao = body.descricao,
    produto.qtdade = body.qtdade,
    produto.preco = body.preco
    await produto.save()

    return res.status(200).json(produto);
  }

  async delete (req: Request, res: Response): Promise<Response> {
    let id = Number(req.params.id)

    let produto: Produto|null = await Produto.findOneBy({id})
    if(! produto){
      return res.status(422).json({ error: 'Produto não encontrado! '})
    }

    await produto.remove()

    return res.status(200).json();
  }
}

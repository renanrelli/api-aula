import { NextFunction, Request, Response, Router } from "express";
import { PaginasController } from "../controllers/PaginasController";
import { Pagina } from "../models/Pagina";

let router: Router = Router();

let paginasController: PaginasController = new PaginasController();

async function validarSeExiste(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  let id = Number(req.params.id);
  let pagina: Pagina | null = await Pagina.findOneBy({ id });
  if (!pagina) {
    return res.status(422).json({ error: "Usuario não encontrado!" });
  }

  res.locals.pagina = pagina;

  return next();
}

router.get("/paginas", paginasController.list);

router.post("/paginas", paginasController.create);

router.put("/paginas/:id", paginasController.update);

router.delete("/paginas/:id", paginasController.delete);

router.get("/paginas/:id", paginasController.find);

export default router;

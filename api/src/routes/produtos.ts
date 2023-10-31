import { Router } from 'express';

import { ProdutosController } from "../controllers/ProdutosController"

let router: Router = Router();

let produtosController: ProdutosController = new ProdutosController()

router.get('/produtos', produtosController.list)

router.post('/produtos', produtosController.create)

router.put('/produtos/:id', produtosController.update)

router.delete('/produtos/:id', produtosController.delete)

router.get('/produtos/:id', produtosController.find)

export default router;

import { Router } from "express";

import { PermissaoController } from "../controllers/PermissaoController";

let router: Router = Router();

let permissaoController: PermissaoController = new PermissaoController();

router.get("/permissoes", permissaoController.list);

router.post("/permissoes", permissaoController.create);

router.put("/permissoes/:id", permissaoController.update);

// router.delete("/permissoes/:id", permissoesController.delete);

router.get("/permissoes/:id", permissaoController.list);

export default router;

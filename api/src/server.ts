import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import usuariosRoutes from "./routes/usuarios";
import paginasRoutes from "./routes/paginas";
import permissaoRoutes from "./routes/permissao";
import autenticacaoRoutes from "./routes/autenticacao";
import { basicAuth } from "./middlewares/basic-auth";

let server: Express = express();
let port: number = Number(process.env.SERVER_PORT || 3000);

server.use(cors());
server.use(express.json());

server.use(autenticacaoRoutes);
server.use(basicAuth, usuariosRoutes);
server.use(paginasRoutes);
server.use(permissaoRoutes);

export default {
  start() {
    server.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  },
};

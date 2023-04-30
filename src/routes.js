import { Router } from "express"
import authMiddleware from "./app/middlewares/auth"

import SessionController from "./app/controllers/SessionController"
import UserController from "./app/controllers/UserController"
import ContactController from "./app/controllers/ContactController"


const routes = new Router()

/*
Rota criar usuário
*/
routes.post("/usuarios", UserController.store)

/*
 Rota realizar login
*/
routes.post("/sessao", SessionController.store)

/*
 Autenticação com jwt (todas as rotas abaixo só é acessada através do login gerando o token)
 */
 routes.use(authMiddleware)
/*
 Rota contatos
 */
routes.post("/contatos", ContactController.store)
routes.get("/contatos", ContactController.index)
routes.put("/contatos/:id", ContactController.update)
routes.delete("/contatos/:id", ContactController.delete)

export default routes

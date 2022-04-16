import { Router } from "express";
import usersController from "./controllers/usersController";
import sessionsController from "./controllers/sessionsController";
import repositoriesController from "./controllers/repositoriesController";
import auth from "./middlewares/auth";

const routes = new Router;

routes.post("/session", sessionsController.create);


routes.use(auth);


routes.get("/users/:user_id/repositories", repositoriesController.index);
routes.post("/users/:user_id/repositories", repositoriesController.create);
routes.get("/users/:user_id/:id/repositories", repositoriesController.read);
routes.put("/users/:user_id/:id/repositories", repositoriesController.update);
routes.delete("/users/:user_id/:id/repositories", repositoriesController.delete);

routes.get("/users", usersController.index);
routes.post("/users", usersController.create);
routes.get("/users/:id", usersController.read);
routes.put("/users/:id", usersController.update);
routes.delete("/users/:id", usersController.delete);



export default routes;
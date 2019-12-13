const express = require('express');

const FeatureController = require('./controllers/FeatureController');
const UserStoryController = require('./controllers/UserStoryController');
const TarefaController = require('./controllers/TarefaController');

const routes = express.Router(); 

routes.post("/features", FeatureController.store);
routes.get("/features", FeatureController.show);
routes.get("/features/:id", FeatureController.showOne);
routes.put("/features/:id", FeatureController.updateOne);
routes.delete("/features/:id", FeatureController.deleteOne);

routes.post("/userstorys", UserStoryController.store);
routes.get("/userstorys", UserStoryController.show);
routes.get("/userstorys/:id", UserStoryController.showOne);
routes.put("/userstorys/:id", UserStoryController.updateOne);
routes.delete("/userstorys/:id", UserStoryController.deleteOne);
routes.get("/userstorys/feature/:id", UserStoryController.indexFeature);

routes.post("/tarefas", TarefaController.store);
routes.get("/tarefas", TarefaController.show);
routes.get("/tarefas", TarefaController.showOne);
routes.put("/tarefas", TarefaController.updateOne);
routes.delete("/tarefas", TarefaController.deleteOne);


module.exports = routes; 
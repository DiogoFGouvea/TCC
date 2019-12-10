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
routes.get("/userstorys/feature/:id", UserStoryController.indexFeature);
routes.get("/userstorys/userstory/:id", UserStoryController.showOne);
routes.put("/userstorys/:id", UserStoryController.updateOne);
routes.delete("/userstorys/:id", UserStoryController.deleteOne);

routes.post("/tarefa", TarefaController.store);
routes.get("/tarefa", TarefaController.show);
routes.get("/tarefa", TarefaController.showOne);
routes.put("/tarefa", TarefaController.updateOne);
routes.delete("/tarefa", TarefaController.deleteOne);


module.exports = routes; 
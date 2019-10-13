const express = require('express');

const FeatureController = require('./controllers/FeatureController');
const UserStoryController = require('./controllers/UserStoryController');
const TarefaController = require('./controllers/TarefaController');

const routes = express.Router(); 

routes.post("/feature", FeatureController.store);
routes.get("/features", FeatureController.show);

routes.post("/userstory", UserStoryController.store);
routes.get("/userstory", UserStoryController.index);

routes.post("/tarefa", TarefaController.store);
routes.get("/tarefa", TarefaController.index);


module.exports = routes; 
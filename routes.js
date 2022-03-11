const express = require('express');

const routes = express.Router();

const materialsController = require('./src/users/index');

routes.get('/rawMaterials', materialsController.consult);
routes.post('/rawMaterials', materialsController.insert);
routes.put('/rawMaterials/:id/request', materialsController.remove);

module.exports = routes;

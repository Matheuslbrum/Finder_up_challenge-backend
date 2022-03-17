const express = require('express');

const routes = express.Router();

const materialsController = require('./src/materials');
const userController = require('./src/users');

routes.get('/rawMaterials', materialsController.consultMaterials);
routes.post('/rawMaterials', materialsController.insertMaterial);
routes.put('/rawMaterials/:id/request', materialsController.removeMaterial);

routes.post('/register', userController.insertUser);
routes.post('/login', userController.autenticate);

module.exports = routes;

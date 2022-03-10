const express = require('express');
const routes = express.Router()

const UserController = require('../users/index');

routes.get('/rawMaterials', UserController.consult)

module.exports = routes
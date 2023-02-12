const express = require('express');
const controller = require('../controllers/routeApiController')

const routes = express.Router();

routes.post('/', controller.routeApiController)

module.exports = routes;

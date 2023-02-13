const express = require('express');
const locationId = require('../controllers/locationIdApiController')

const routes = express.Router();

routes.post('/', locationId.getLocationID)

module.exports = routes;

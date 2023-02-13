const express = require('express')
const origin = require('../controllers/originsController')
const destination = require('../controllers/destinationsController')
const gmaps = require('../controllers/routesGmaps')

const routes = express.Router()


routes.post('/', gmaps.storeDataController)
// routes.get('/origin', origin.getOriginController)
// routes.post('/origin', origin.addOriginController)
// routes.get('/destination', destination.getDestinationController)

module.exports = routes

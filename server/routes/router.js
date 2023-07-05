const express = require('express');
const route = express.Router()
const services = require('../services/render');
const controller = require('../controller/controller');

route.get('/', services.homeRoutes);

route.get('/add_customer', services.add_customer)

route.get('/update_customer', services.update_customer)


//API
route.post('/api/customer', controller.create);
route.get('/api/customer', controller.find);
route.put('/api/customer/:id', controller.update);
route.delete('/api/customer/:id', controller.delete);

module.exports = route
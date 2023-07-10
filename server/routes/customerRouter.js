const express = require('express');
const route = express.Router()
const services = require('../services/render');
const controller = require('../controller/customercontroller');

route.get('/', services.homeRoutes);

route.get('/customer_details', services.customer_details);

route.get('/add_customer', services.add_customer)

route.get('/update_customer', services.update_customer)

route.get('/register', services.register)

route.get('/signin', services.signin)


//API for customer
route.post('/api/customer', controller.create);
route.get('/api/customer', controller.find);
route.put('/api/customer/:id', controller.update);
route.delete('/api/customer/:id', controller.delete);


module.exports = route
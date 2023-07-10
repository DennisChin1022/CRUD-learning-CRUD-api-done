const express = require('express');
const route = express.Router()
const services = require('../services/render');
const controller = require('../controller/usercontroller');


route.get('/', services.homeRoutes);

route.get('/register', services.register)

route.get('/signin', services.signin)

route.get('/user_details', services.user_details)

//API for user
route.post('/api/user', controller.register);
route.post('/api/user/login', controller.login);

module.exports = route



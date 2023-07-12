const express = require('express');
const route = express.Router()
const services = require('../services/render');
const controller = require('../controller/usercontroller');
const { authUser } = require('../controller/authController');

route.get('/', services.homeRoutes);

route.get('/user_details', authUser, services.user_details)

route.get('/register', services.register)

route.get('/update_user', services.update_user)




//API for user
route.post('/api/user', controller.register);
route.post('/api/user/login', controller.login);
route.get('/api/user', controller.find);
route.put('/api/user/:id', controller.Update);
route.delete('/api/user/:id', controller.Delete);

module.exports = route



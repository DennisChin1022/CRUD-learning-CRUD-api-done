const express = require('express');
const morgan = require('morgan')
const bodyparser = require("body-parser");
const path = require('path');
const dotenv = require('dotenv');

const connectDB = require('./server/database/connection');

const app = express();

dotenv.config( { path : 'config.env'} )
const PORT = process.env.PORT || 3000

app.use(morgan('tiny'));

connectDB();

app.use(bodyparser.urlencoded({ extended : true}))

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.use('/', require('./server/routes/router'))

app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});



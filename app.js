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

// app.use(express.static(__dirname + '/public/css'));
// app.use(express.static('./public/css'))
// app.use(express.static('./public/js'))

app.use(express.json());
app.use('/css', express.static(path.resolve(__dirname, "public/css")))
app.use('/js', express.static(path.resolve(__dirname, "public/js")))

app.use('/', require('./server/routes/customerRouter'))
app.use('/', require('./server/routes/userRouter'))
app.use('/api/customer', require('./server/routes/customerRouter'))
app.use('/api/user', require('./server/routes/userRouter'))

app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});



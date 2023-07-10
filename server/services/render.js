const axios = require('axios');

exports.homeRoutes = (req, res) =>{
    res.render('homepage');
}

exports.customer_details = (req, res) =>{
    axios.get('http://localhost:3000/api/customer')
    .then(function(response){
    res.render('customer_details',{customer: response.data});
})
.catch(err=>{
    res.send(err);
})
}

exports.add_customer = (req, res) =>{
    res.render('add_customer');
}

exports.update_customer = (req, res) =>{
    axios.get('http://localhost:3000/api/customer', { params : { id : req.query.id }})
        .then(function(customerdata){
            res.render("update_customer", { customer : customerdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}

exports.register = (req, res) =>{
    res.render('register');
}

exports.user_details = (req, res) =>{
    axios.get('http://localhost:3000/api/user')
    .then(function(response){
        console.log(response.data)
    res.render('user_details',{ user: response.data});
})
.catch(err=>{
    res.send(err);
})
}

exports.signin = (req, res) =>{
    res.render('signin');
}


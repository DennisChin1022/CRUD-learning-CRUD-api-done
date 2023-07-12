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
        .then(function(response){
            res.render("update_customer", { customer : response.data})
        })
        .catch(err =>{
            res.send(err);
        })
}


exports.user_details = (req, res) =>{
    axios.get('http://localhost:3000/api/user')
    .then(function(response){
    res.render('user_details',{ user : response.data});
})
.catch(err=>{
    res.send(err);
})
}

exports.register = (req, res) =>{
    res.render('register');
}



exports.update_user = (req, res) =>{
    axios.get('http://localhost:3000/api/user', { params : { id : req.query.id }})
    .then(function(response){
        res.render("update_user", { user : response.data})
    })
    .catch(err =>{
        res.send(err);
    })
}


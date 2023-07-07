const axios = require('axios');


exports.homeRoutes = (req, res) =>{
//     res.render("index");
// }

    axios.get('http://localhost:3000/api/customer')
    .then(function(response){
    res.render('index',{user: response.data});
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
        .then(function(userdata){
            res.render("update_customer", { user : userdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}
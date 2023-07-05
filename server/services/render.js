const axios = require('axios');


exports.homeRoutes = (req, res) =>{
//     res.render("index");
// }

    axios.get('http://localhost:3000/api/customer')
    .then(function(response){
        console.log(response.data)
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
    res.render('update_customer');
}
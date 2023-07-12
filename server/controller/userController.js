const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

//@desc Register a user
//@route POST /api/users/register
//@access public
const register = async (req, res) => {
    let {name, email, password} = req.body;
    name = name.trim();
    email = email.trim();
    password = password.trim();

    if(name == "" || email == "" || password == "" ){
        res.json({
            status: "FAILED",
            message: "Empty input fields!"
        });
    } else if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]}))$/.test(email)){
        res.json({
            status: "FAILED",
            message: "Empty email entered"
        })
    }else{
        User.find({email}).then(result => {
            if (result.length){
                res.json({
                    status: "FAILED",
                    message:"User with the provided email already exists"
                })
            } 
            else{
                const saltRounds = 10;
                bcrypt.hash(password, saltRounds).then(hashedPassword => {
                    const newUser = new User ({
                        name,
                        email,
                        password: hashedPassword,

                    });
                    newUser
                        .save(newUser)
                        .then(data => {
                        // res.send(data)
                        res.redirect('/');
                    })
                    .catch(err => {
                        res.json({
                            status:"FAILED",
                            message:"An error occurred while saving user account!"
                        })
                    })
                })
                .catch(err => {
                    res.json({
                        status:"FAILED",
                        message:"An error occurred while hashing password!"
                    })
                })
            }
        }).catch(err => {
            console.log(err);
            res.json({
                status:"FAILED",
                message:"An error occurred while checking for existing user!"
            })
        })
    }

};

const login = async (req, res) => {
    let {email, password} = req.body;
    email = email.trim();
    password = password.trim();

    if( email == "" || password == "" ){
        res.json({
            status: "FAILED",
            message: "Please fill in your Email and Password"
        });
    }   
        User.find({email}).then(data => {
            if (data){
                const hashedPassword = data[0].password;
                bcrypt.compare(password, hashedPassword).then(result => {
                    if(result){
                        res.redirect('/customer_details');
                    }
                    else{
                        res.json ({
                            status: "FAILED",
                            message: "Invalid password entered!"
                        })
                    }
                })
                .catch(err => {
                    res.json({
                    status: "FAILED",
                    message: "An eror occured while comparing passwords"
                    })
                })
            }
            else {
                res.json({
                    status: "FAILED",
                    message: "Invalid credentials entered!"
                    })
            }
        })
        .catch(err => {
            res.json({
            status: "FAILED",
            message: "An eror occured while checking for existing"
            })
            
    })
}

const find = async (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        User.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving user with id " + id})
            })

    }else{
        User.find()
            .then(customer => {
                res.send(customer)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }

    
}

const Delete = async(req, res)=>{
    const id = req.params.id;

    User.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}
                
const Update = async(req, res)=>{
    const id = req.params.id;
    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
}



module.exports = { register, login, find, Delete, Update };
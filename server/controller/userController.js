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
    }   else if (!/^[a-zA-z ]*$/.test(name)){
        res.json({
            status: "FAILED",
            message: "Empty name entered"
        })
    }   else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
        res.json({
            status: "FAILED",
            message: "Empty email entered"
        })
    }   else if (password.length < 8){
        res.json({
            status: "FAILED",
            message: "Password is too short!"
        })
    }   else{
        User.find({email}).then(result => {
            if (result.length){
                res.json({
                    status: "FAILED",
                    message:"User with the provided email already exists"
                })
            } else{
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
                    // newUser.save().then(result =>{
                    //     res.json({
                    //         status:"SUCCESS",
                    //         message:"Signup successful",
                    //         data: result,
                    //     }).then(data => {
                    //         // res.send(data)
                    //         res.redirect('/');
                    // })
                    // })
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
                
module.exports = { register, login };
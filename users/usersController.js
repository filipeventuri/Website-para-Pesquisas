const express = require('express');
const router = express.Router();
const users = require("./users");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");

const jwt = require("jsonwebtoken");

router.get("/users/cadastro", auth, (req,res)=>{
    res.render("users/cadastro");
});
router.get("/user/painel",auth, (req,res)=>{
    res.render("users/painel");
});

router.post("/users/create",  (req,res)=>{
    var email = req.body.email;
    var password = req.body.password;
    var salt = bcrypt.genSaltSync(10); 
    var hash= bcrypt.hashSync(password, salt);

    users.findOne({where:{email:email}}).then( user =>{
        if(user == undefined){
            users.create({
                email: email,
                password: hash
            }).then(()=>{
                res.redirect("/");
            }).catch(()=>{
                res.redirect("/");
            })
        }else{
            res.redirect("/");
        }
    }
    )

});

router.get("/login", (req,res)=>{
    
    if(req.session.user == undefined){
        res.render("users/login");
    }else{
        res.redirect("/user/painel");
    }

    

});



router.post("/authenticate", (req,res)=>{
    var {email,password} = req.body;

    users.findOne({where:{email:email}}).then(user=>{
    
        if(user!=undefined){
            
            var correct = bcrypt.compareSync(password, user.password);
            
            if(correct){
                req.session.user = {
                    id: user.id,
                    email: user.email
                }
                res.redirect("/user/painel");
            }else{
                res.redirect("/login")
            }
        }else{
            res.redirect("/login");
        }

    })
    
});

router.get("/logout", (req,res)=>{
    if(req.session.user == undefined){
        res.render("/");
    }else{
        req.session.user = undefined;
        res.redirect("/");
    }
})



module.exports = router;

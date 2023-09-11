const express = require('express');
const router = express.Router();
const perguntas = require("./perguntas.js");
const { default: slugify } = require('slugify');

router.post("/perguntas/create", (req,res)=>{
    var pergunta = req.body.pergunta;
            perguntas.create({
                pergunta: pergunta,
                slug: slugify(pergunta),
            }).then(()=>{
                res.redirect("/");
            }).catch(()=>{
                res.redirect("/");
            })
});

module.exports = router;

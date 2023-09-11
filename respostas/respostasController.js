const express = require('express');
const router = express.Router();
const Respostas = require("./respostas.js");
const Perguntas = require("../perguntas/perguntas.js");

router.post("/respostas/create", (req,res)=>{
    var resposta = req.body.resposta;
    var perguntaId = req.body.perguntaId;
    Respostas.create({
        resposta:resposta,
        perguntaId:perguntaId
    }).then(()=>{
        res.redirect("/");
    }).catch((err)=>{
        console.log(err);
    })

})




module.exports = router;

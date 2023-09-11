const express = require("express");
const respostasController = require("./respostas/respostasController.js");
const connection = require("./database/db.js");
const usersController = require("./users/usersController.js");
const perguntasController = require("./perguntas/perguntasController.js");
const bodyParser = require('body-parser');
const session = require("express-session");
const perguntas = require("./perguntas/perguntas.js");
const auth = require("./middleware/auth");



const app = express();

app.use(session({
    secret:"uguturhqwndpqowijdh",
    cookie: {
        maxAge: 7200000 //o tempo para destruir os cookies automaticamente 30000 milisegundos
    }

}))


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("/", usersController);
app.use("/", perguntasController);
app.use("/", respostasController);

connection.authenticate().then(()=>{
    console.log("Database acessed")
}).catch((err)=>{
    console.log("err: " + err);
})

app.get("/", (req,res)=>{
       
     res.render("index");
     
})

app.get("/formularioPerguntas", auth, (req,res)=>{
    
    res.render("formularioPerguntas");
})

app.get("/formularioRespostas", (req,res)=>{
    perguntas.findAll().then(pergunta=>{
        res.render("formularioRespostas", {pergunta:pergunta});
    })
})

app.listen(8080, ()=>{
    console.log("API IS WORKING!");
})
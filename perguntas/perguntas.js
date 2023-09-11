const sequelize = require("sequelize");
const connection = require("../database/db.js");

const Perguntas = connection.define("perguntas", {
    pergunta:{
        type: sequelize.STRING,
        allowNull: false
    },
    slug:{
        type: sequelize.STRING,
        allowNull:false

    }
});

Perguntas.sync({force:false});

module.exports = Perguntas;

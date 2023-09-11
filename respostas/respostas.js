const sequelize = require("sequelize");
const connection = require("../database/db.js");
const Perguntas = require("../perguntas/perguntas.js");

const Respostas = connection.define("respostas", {
    resposta: {
        type: sequelize.INTEGER,
        allowNull: false
    }
});

Perguntas.hasMany(Respostas);
Respostas.belongsTo(Perguntas);

Respostas.sync({force:false});

module.exports = Respostas;
const Sequelize = require("sequelize");
const instancia = require("../../banco-de-dados"); 

const colunas = {
    empresa: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    categoria: {
        type: Sequelize.ENUM("ração", "brinquedo"),
        allowNull: false
    }
}

const opcoes = {
    freezeTableName: true,
    tableName: "Fornecedores",
    timestamps: true,
    createdAt: "dataCriação",
    updatedAt: "dataAtualização",
    version: "versão"
}

module.exports = instancia.define("fornecedor", colunas, opcoes)
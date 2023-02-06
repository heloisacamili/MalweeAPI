const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('Address', {
        id : {
            type : Sequelize.INTEGER.UNSIGNED,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        logradouro : {
            type : Sequelize.STRING(100),
            allowNull : false,
        },
        bairro : {
            type : Sequelize.STRING(100),
            allowNull : false,
        },
        ciadade : {
            type : Sequelize.STRING(100),
            allowNull : false,
        },
        uf : {
            type : Sequelize.STRING(100),
            allowNull : false,
        },
        cep : {
            type : Sequelize.STRING(100),
            allowNull : false,
        }, 
        num : {
            type : Sequelize.STRING(100),
            allowNull : false,
        },
        complemento : {
            type : Sequelize.STRING(100),
            allowNull : false,
        },
        pontoRef : {
            type : Sequelize.STRING(100),
            allowNull : false,
        },
        fkClient : {
            type : Sequelize.INTEGER,
            allowNull : false,
        }
    })
}
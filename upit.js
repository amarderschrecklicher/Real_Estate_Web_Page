const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const Upiti = sequelize.define("Upit",{
        tekst_upita:Sequelize.STRING
    })
    return Upiti;
};

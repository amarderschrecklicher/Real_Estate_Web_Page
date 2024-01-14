const Sequelize = require("sequelize");
const sequelize = new Sequelize("wt24","root","password",
{
    host:"127.0.0.1",
    dialect:"mysql",
    logging:false
});
const db={};

db.Sequelize = Sequelize;  
db.sequelize = sequelize;

//import modela
db.nekretnina = require(__dirname+'/nekretnina.js')(sequelize);
db.korisnik = require(__dirname+'/korisnik.js')(sequelize);
db.upit = require(__dirname+'/upit.js')(sequelize);

db.nekretnina.hasMany(db.upit,{as:'upitiNekretnine'});
db.korisnik.hasMany(db.upit,{as:'upitKorisnika'})

module.exports=db;
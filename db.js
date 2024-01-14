const Sequelize = require("sequelize");
const sequelize = new Sequelize("wt24","root","password",{host:"127.0.0.1",dialect:"mysql",logging:false});
const db={};

db.Sequelize = Sequelize;  
db.sequelize = sequelize;

//import modela
db.nekretnina = sequelize.import(__dirname+'/nekretnine.js');
db.korisnik = sequelize.import(__dirname+'/korisnici.js');
db.upit = sequelize.import(__dirname+'/upiti.js');

db.nekretnina.hasMany(db.upiti,{as:'upitiNekretnine'});
db.korisnk.hasMany(db.upiti,{as:'upitKorisnika'})

module.exports=db;
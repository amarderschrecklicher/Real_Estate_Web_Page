const express = require('express');
const fs = require('fs');
const bcrypt = require('bcrypt');
const path = require('path');
const bodyParser = require('body-parser')
const session = require("express-session");
const app = express();
app.use(express.static('public'));
app.listen(3000);

/*
//Za bazu
const user1 = {ime:"Amar", prezime: "Tahirović", username: "username1", password: "$2b$10$M6SHS5Ky7JcZo.yNz3Ew9.3tajVIfJ/utuvgAlmvKj1QOsjNJjSDW"};
const user2 = {ime:"Neko2", prezime: "Nekic2", username: "username2", password: "$2b$10$VpfvG4qgVZU5fuAFgotB2utGjimSB99LhGYp2g/8SEYVD575jDQYO"};

const nek1 = {tip_nekretnine: "Stan", naziv: "Useljiv stan Sarajevo",kvadratura: 58,cijena: 232000,tip_grijanja: "plin",lokacija: "Novo Sarajevo",godina_izgradnje: 2019,datum_objave: "01.10.2023.",opis: "Sociis natoque penatibus.",broj_pretraga:null,broj_klikova:null};
const nek2 = {tip_nekretnine: "Stan", naziv: "Elegantan stan u centru",kvadratura: 75,cijena: 300000,tip_grijanja: "centralno",lokacija: "Centar",godina_izgradnje: 2020,datum_objave: "03.10.2023.",opis: "Aenean commodo ligula eget dolor.",broj_pretraga:10,broj_klikova:null};
const nek3 = {tip_nekretnine: "Stan", naziv: "Prostran stan na Dobrinji",kvadratura: 90,cijena: 350000,tip_grijanja: "centralno",lokacija: "Dobrinja",godina_izgradnje: 2018,datum_objave: "05.10.2023.",opis: "Pellentesque eu pretium quis.",broj_pretraga:null,broj_klikova:23};
const nek4 = {tip_nekretnine: "Kuća", naziv: "Luksuzna vila",kvadratura: 350,cijena: 850000,tip_grijanja: "centralno",lokacija: "Bjelašnica",godina_izgradnje: 2018,datum_objave: "15.10.2023.",opis: "Fusce vel metus volutpat.",broj_pretraga:11,broj_klikova:11};
const nek5 = {tip_nekretnine: "Kuća", naziv: "Porodična kuća sa bazenom",kvadratura: 280,cijena: 500000,tip_grijanja: "toplana",lokacija: "Ilidža",godina_izgradnje: 2015,datum_objave: "19.10.2023.",opis: "Quisque velit nisi.",broj_pretraga:null,broj_klikova:null};
const nek6 = {tip_nekretnine: "Kuća", naziv: "Vikendica na planini",kvadratura: 180,cijena: 280000,tip_grijanja: "kamin",lokacija: "Trebević",godina_izgradnje: 2010,datum_objave: "25.10.2023.",opis: "Vivamus magna justo.",broj_pretraga:3,broj_klikova:null};
const nek7 = {tip_nekretnine: "Poslovni prostor", naziv: "Moderni uredi u Sarajevu",kvadratura: 150,cijena: 400000,tip_grijanja: "klima",lokacija: "Marijin Dvor",godina_izgradnje: 2021,datum_objave: "07.10.2023.",opis: "Suspendisse potenti.",broj_pretraga:null,broj_klikova:5};
const nek8 = {tip_nekretnine: "Poslovni prostor", naziv: "Prostor za kafić",kvadratura: 80,cijena: 280000,tip_grijanja: "klima",lokacija: "Ilidža",godina_izgradnje: 2020,datum_objave: "09.10.2023.",opis: "Donec sollicitudin molestie malesuada.",broj_pretraga:null,broj_klikova:80};
const nek9 = {tip_nekretnine: "Poslovni prostor", naziv: "Veliki skladišni prostor",kvadratura: 500,cijena: 600000,tip_grijanja: "nema",lokacija: "Vogošća",godina_izgradnje: 2015,datum_objave: "11.10.2023.",opis: "Lorem ipsum dolor sit amet.",broj_pretraga:99,broj_klikova:99};

const upit11 = {tekst_upita: "Nullam eu pede mollis pretium.", NekretninaId: 1, KorisnikId	: 1};
const upit12 = {tekst_upita: "Phasellus viverra nulla.", NekretninaId: 1, KorisnikId	: 2};
const upit21 = {tekst_upita: "Vestibulum ante ipsum primis.", NekretninaId: 2, KorisnikId	: 1};
const upit22 = {tekst_upita: "Aenean massa.", NekretninaId: 2, KorisnikId	: 2};
const upit23 = {tekst_upita: "Nunc tincidunt ante vitae massa.", NekretninaId: 2, KorisnikId	: 2};
const upit31 = {tekst_upita: "Etiam ultricies nisi vel augue.", NekretninaId: 3, KorisnikId	: 2};
const upit32 = {tekst_upita: "Duis aute irure dolor.", NekretninaId: 3, KorisnikId	: 1};
const upit41 = {tekst_upita: "Quisque rutrum.", NekretninaId: 4, KorisnikId	: 1};
const upit42 = {tekst_upita: "Curabitur arcu erat.", NekretninaId: 4, KorisnikId	: 1};
const upit51 = {tekst_upita: "Vivamus suscipit tortor.", NekretninaId: 5, KorisnikId	: 2};
const upit52 = {tekst_upita: "Mauris blandit aliquet elit.", NekretninaId: 5, KorisnikId	: 2};
const upit61 = {tekst_upita: "Pellentesque in ipsum id.", NekretninaId: 6, KorisnikId	: 1};
const upit62 = {tekst_upita: "Nulla porttitor accumsan tincidunt.", NekretninaId: 6, KorisnikId	: 2};
const upit71 = {tekst_upita: "Proin eget tortor risus.", NekretninaId: 7, KorisnikId	: 1};
const upit72 = {tekst_upita: "Vestibulum ac diam sit amet.", NekretninaId: 7, KorisnikId	: 2};
const upit81 = {tekst_upita: "Nulla quis lorem ut libero malesuada.", NekretninaId: 8, KorisnikId	: 1};
const upit82 = {tekst_upita: "Sed porttitor lectus nibh.", NekretninaId: 8, KorisnikId	: 1};
const upit91 = {tekst_upita: "Aenean sollicitudin.", NekretninaId: 9, KorisnikId	: 2};
const upit92 = {tekst_upita: "Curabitur non nulla.", NekretninaId: 9, KorisnikId	: 2};
  await db.korisnik.bulkCreate([user1,user2]);
  await db.nekretnina.bulkCreate([nek1,nek2,nek3,nek4,nek5,nek6,nek7,nek8,nek9]);
  await db.upit.bulkCreate([upit11,upit12,upit21,upit22,upit23,upit31,upit32,upit41,upit42,upit51,upit52,
    upit61,upit62,upit71,upit72,upit81,upit82,upit91,upit92]);
*/
const db = require('./db.js');

// Sync all models to the database
db.sequelize.sync().then(async() => {
  console.log('Tables have been created!');
}).catch((err) => {
  console.error('Error creating tables:', err);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/:pageName.html', (req, res) => {
  const pageName = req.params.pageName;
  res.sendFile(path.join(__dirname, 'public', 'html', `${pageName}.html`));
});


app.use(session({
    secret: 'code',
    resave: false,
    saveUninitialized: true,
 }));

const filePath = path.join(__dirname, 'data', 'korisnici.json');
const filePath2 = path.join(__dirname, 'data', 'nekretnine.json');
const filePath3 = path.join(__dirname, 'data', 'marketing.json');

app.get('/nekretnina/:id',async function(req,res){

      try {
          let nekretnina = await db.nekretnina.findOne({ where: { id: req.params.id } });
          if(nekretnina){
          let upiti = await db.upit.findAll({where :{NekretninaId:req.params.id }})
          for (let i = 0; i<upiti.length;i++){
            let korisnik = await db.korisnik.findOne({where: {id: upiti[i].KorisnikId}})
            upiti[i] = {
                "username":korisnik ? korisnik.username:null,
                "tekst_upita": upiti[i].tekst_upita
            }
          }
          nekretnina = {...nekretnina.dataValues, "upiti":upiti}
            res.status(200).json({nekretnina});
        }
          else
            res.status(400).json({ greska: "Nekretnina sa id-em "+req.params.id+" ne postoji"});
      }
      catch (err) {
          console.log(err);
          res.status(400).json({ greska: "Zahtjev nije uspio"});
      }
  
});

app.post('/login', async function(req,res){
  const { username, password } = req.body;

      try {
        let korisnik = await db.korisnik.findOne({ where: { username: username } });
        var validPassword = false
        if(korisnik)
        validPassword = await bcrypt.compare(password,korisnik.password);
          if(validPassword){
              req.session.user = korisnik;
              res.status(200).json({poruka:"Uspješna prijava"})
          }
          else {
              res.status(401).json({poruka:"Neuspješna prijava"})
          }
      } catch (error) {
        console.error('Greška: ', error);
      }
});

app.post('/logout', (req, res) => {
  if (req.session.user) {
      req.session.destroy(err => {
          if (!err) {
            res.status(200).json({ poruka: 'Uspješno ste se odjavili' });
          }
      });
  } else {
      res.status(401).json({ greska: 'Neautorizovan pristup' });
  }
});


app.get('/korisnik',async function(req,res){
    
  if (req.session.user)
  {
      try {
        res.status(200).json(req.session.user)
      } catch (error) {
        console.error('Greška: ', error);
      }
    
  }
  else{
    res.status(401).json({greska:"Neautorizovan pristup"})
  }
});


app.post('/upit',async function(req,res){
    
  if (req.session.user)
  {
    const { nekretnina_id, tekst_upita } = req.body;
    try{
            const new_upit = {tekst_upita: tekst_upita, NekretninaId: nekretnina_id, KorisnikId	: req.session.user.id};
            db.sequelize.sync().then(async() => {
              await db.upit.create(new_upit); 
              res.status(200).json({poruka:"Upit je uspješno dodan"})
            }).catch((err) => {
              res.status(400).json({greska:"Nekretnina sa id-em "+nekretnina_id+" ne postoji"})
            });
                
      }catch(error) {
        console.error('Greška: ', error);
      }
  }
  else{
    res.status(401).json({greska:"Neautorizovan pristup"})
  }
});

app.put('/korisnik',function(req,res){
    
  if (req.session.user)
  {
    const { ime, prezime, username, password } = req.body;
  
      try {
        if(ime)
          req.session.user.ime = ime
        if(prezime)
          req.session.user.prezime = prezime
        if(username)
          req.session.user.username = username
        if(password){
          bcrypt.hash(password, 10, function(err, hash) {
            req.session.user.password = hash
            });          
        }

        db.sequelize.sync().then(async() => {
          await db.korisnik.update(req.session.user,{
            where:{ id: req.session.user.id}
          }); 
          res.status(200).json({ poruka: 'Podaci su uspješno ažurirani' });
        }).catch((err) => {
        });

      } catch (error) {
        console.error('Greška: ', error);
      }
    
  }
  else{
    res.status(401).json({greska:"Neautorizovan pristup"})
  }
});


app.get('/nekretnine',async function(req,res){
 
      try {
        let nekretnine = await db.nekretnina.findAll()
        res.status(200).json(nekretnine)
      } catch (error) {
        console.error('Error parsing JSON data: ', error);
      }
    
});

app.post('/marketing/nekretnine',function(req,res){

    const {nizNekretnina} = req.body;
    console.log("pretraga")
    console.log(nizNekretnina)
    req.session.nekretnine = []

      fs.readFile(filePath3, 'utf8', async (err, data) => {
        if (err) {
          console.error(err);
          return;
        }   
        try {
          var marketing = await JSON.parse(data);
          
          nizNekretnina.forEach(idd => {
            var nekretnina = marketing.find(x => x.id == idd);
            if (!nekretnina) { 
                marketing.push({
                id: parseInt(idd, 10),
                klikovi: 0,
                pretrage: 0
              });
              nekretnina = marketing.find(x => x.id == idd);
            }           
            nekretnina.pretrage += 1;
          });
          req.session.nekretnine = marketing
          console.log("pise")       
          console.log(marketing) 
          fs.writeFile(filePath3,JSON.stringify(marketing,null,2),(err)=>{})
          console.log("gotovo pisanje")

          res.status(200).json();

        } catch (error) {
          console.error('Error parsing JSON data: ', error);
        }
      });        
 
});

app.post('/marketing/nekretnina/:id',function(req,res){

    const idd = req.params.id;
    req.session.nekretnine = []

    fs.readFile(filePath3, 'utf8', async (err, data) => {
      if (err) {
        console.error(err);
        return;
      }   
      try {
        var marketing = await JSON.parse(data)
        
        var nekretnina = marketing.find(x => x.id == idd)

        if(!nekretnina){
          const novo = {
            id: parseInt(idd,10),
            klikovi: 0,
            pretrage:0
          }
          marketing.push(novo)
          nekretnina = marketing.find(x => x.id == idd)
        }
        
        nekretnina.klikovi+=1    
        req.session.osvjezi.nizNekretnina = []
        req.session.osvjezi.nizNekretnina.push(nekretnina)       
        req.session.nekretnine.push(nekretnina)

      console.log("pise")
      fs.writeFile(filePath3,JSON.stringify(marketing,null,2),(err)=>{})       
      console.log("gotovo pisanje")

        res.status(200).json()

      } catch (error) {
        console.error('Error parsing JSON data: ', error);
      }
    });
  
});

app.post('/marketing/osvjezi',function(req,res){
  if(req.session){
    var {nizNekretnina} = req.body;
    console.log("poslao")
    console.log(req.body)
    fs.readFile(filePath3, 'utf8', async (err, data) => {
      if (err) {
        console.error(err);
        return;
      }   
      try {

       const mark =  await JSON.parse(data)
       fs.readFile(filePath3, 'utf8', async (err, data) => {
        if (err) {
          console.error(err);
          return;
        }   
        try {

        if(Object.keys(req.body).length == 0){
          nizNekretnina = req.session.nekretnine
        }

        const marketing = await JSON.parse(data)

         var osvjezi = {
          nizNekretnina : marketing.filter(item => nizNekretnina.includes(item.id))
        }
        console.log("sesija:")
        console.log(req.session.osvjezi)

        var salji = {
          nizNekretnina : []
        }
        if(req.session.osvjezi!=undefined && Object.keys(req.body).length == 0)
        marketing.forEach(element=>{
          const found = req.session.osvjezi.nizNekretnina.find(x=>x.id == element.id)
          if(found && (found.pretrage!=element.pretrage || found.klikovi!=element.klikovi)){
            salji.nizNekretnina.push(element)
          }
        })

        if(salji.nizNekretnina.length!=0){
          console.log("vratio")
          console.log(salji)
          req.session.osvjezi = salji
          res.status(200).json(salji)
        }
        else if(req.session.osvjezi != undefined && Object.keys(req.body).length == 0 && req.session.osvjezi.length != 0 ){
          console.log("nista")
          res.status(200).json()
        }
        else{
          req.session.nekretnine = []
          console.log("vratio")
          console.log(osvjezi)
          req.session.osvjezi = osvjezi
          res.status(200).json(osvjezi)
        }
      } catch (error) {
        console.error('Error parsing JSON data: ', error);
      } 

      })
        
      } catch (error) {
        console.error('Error parsing JSON data: ', error);
      } 
    });
  }
});
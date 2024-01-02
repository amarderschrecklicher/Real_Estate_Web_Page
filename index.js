const express = require('express');
const fs = require('fs');
const bcrypt = require('bcrypt');
const path = require('path');
const bodyParser = require('body-parser')
const session = require("express-session");
const { connect } = require('http2');
const app = express();
app.use(express.static('public'));
app.listen(3000);

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

app.post('/login', function(req,res){
  const { username, password } = req.body;
  fs.readFile(filePath, 'utf8',async (err, data) => {
      if (err) {
        console.error(err);
        return;
      }   
      try {
        const korisnici = JSON.parse(data);        
        var a = korisnici.find(korisnik => korisnik.username == username)
        var validPassword = false
        if(a)
        validPassword = await bcrypt.compare(password,a.password);
          if(validPassword){
              req.session.username = username;
              res.status(200).json({poruka:"Uspješna prijava"})
          }
          else {
              res.status(401).json({poruka:"Neuspješna prijava"})
          }
      } catch (error) {
        console.error('Error parsing JSON data: ', error);
      }
    });
});

app.post('/logout', (req, res) => {
  if (req.session.username) {
      req.session.destroy(err => {
          if (!err) {
            res.status(200).json({ poruka: 'Uspješno ste se odjavili' });
          }
      });
  } else {
      res.status(401).json({ greska: 'Neautorizovan pristup' });
  }
});


app.get('/korisnik',function(req,res){
    
  if (req.session.username)
  {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }   
      try {
        const korisnici = JSON.parse(data);
        var a = korisnici.find(korisnik => korisnik.username == req.session.username)
        res.status(200).json(a)
      } catch (error) {
        console.error('Error parsing JSON data: ', error);
      }
    });
    
  }
  else{
    res.status(401).json({greska:"Neautorizovan pristup"})
  }
});


app.post('/upit',function(req,res){
    
  if (req.session.username)
  {
    const { nekretnina_id, tekst_upita } = req.body;

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }   
      try {
        const korisnici = JSON.parse(data);
        var a = korisnici.find(korisnik => korisnik.username == req.session.username)
        fs.readFile(filePath2, 'utf8', (err, data) => {
          const nekretnine = JSON.parse(data);
          var n = nekretnine.find(nekretnina => nekretnina.id == nekretnina_id)
          if(n){
            n.upiti.push({
              korisnik_id : a.id,
              tekst_upita : tekst_upita
            })
            fs.writeFile(filePath2,JSON.stringify(nekretnine,null,2),(err)=>{
              if(err){
                res.status(200).json("Error writting to file: ", err);
              }
              else{
                res.status(200).json({ poruka: 'Upit je uspješno dodan' });
              }
            });          
          }
          else{
            res.status(400).json({greska:"Nekretnina sa id-em "+nekretnina_id+" ne postoji"})
          }
        })
      } catch (error) {
        console.error('Error parsing JSON data: ', error);
      }
    });
    
  }
  else{
    res.status(401).json({greska:"Neautorizovan pristup"})
  }
});

app.put('/korisnik',function(req,res){
    
  if (req.session.username)
  {
    const { ime, prezime, username, password } = req.body;
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }   
      try {
        const korisnici = JSON.parse(data);
        var a = korisnici.find(korisnik => korisnik.username == req.session.username)
        if(ime)
          a.ime = ime
        if(prezime)
          a.prezime = prezime
        if(username){
          a.username = username
          req.session.username = username
        }
        if(password){
          bcrypt.hash(password, 10, function(err, hash) {
            a.password = hash
            });          
        }

          fs.writeFile(filePath,JSON.stringify(korisnici,null,2),(err)=>{
            if(err){
              res.status(200).json("Error writting to file: ", err);
            }
            else{
              res.status(200).json({ poruka: 'Podaci su uspješno ažurirani' });
            }
          });       

      } catch (error) {
        console.error('Error parsing JSON data: ', error);
      }
    });
    
  }
  else{
    res.status(401).json({greska:"Neautorizovan pristup"})
  }
});


app.get('/nekretnine',function(req,res){
    
    fs.readFile(filePath2, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }   
      try {
        const nekretnine = JSON.parse(data);
        req.session.nekretnine = nekretnine.map(x=>x.id)
        req.session.osvjezi = ""
        res.status(200).json(nekretnine)
      } catch (error) {
        console.error('Error parsing JSON data: ', error);
      }
    });
    
});

app.post('/marketing/nekretnine',function(req,res){

    const {nizNekretnina} = req.body;
    console.log("pretraga")
    console.log(nizNekretnina)

      fs.readFile(filePath3, 'utf8',async (err, data) => {
        if (err) {
          console.error(err);
          return;
        }   
        try {
          const marketing = JSON.parse(data);
          
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
      
        fs.writeFile(filePath3, JSON.stringify(marketing, null, 2), async (err) => {
            if (err) {
              console.error(err);
              return;
            }
          }); 

          req.session.nekretnine = nizNekretnina;
          res.status(200).json();

        } catch (error) {
          console.error('Error parsing JSON data: ', error);
        }
      });        
 
});

app.post('/marketing/nekretnina/:id',function(req,res){

    const idd = req.params.id;

    fs.readFile(filePath3, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }   
      try {
        const marketing = JSON.parse(data)
        
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
        
        fs.writeFile(filePath3,JSON.stringify(marketing,null,2),(err)=>{
        });       

        req.session.nekretnine = [parseInt(idd,10)]
        res.status(200).json()

      } catch (error) {
        console.error('Error parsing JSON data: ', error);
      }
    });
  
});

app.post('/marketing/osvjezi',function(req,res){
      
    var {nizNekretnina} = req.body;
    console.log("poslao")
    console.log(req.body)

    fs.readFile(filePath3, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }   
      try {

        const marketing = JSON.parse(data)

        if(Object.keys(req.body).length == 0){
          nizNekretnina = req.session.osvjezi
        }
        else{
            req.session.osvjezi = req.session.nekretnine
        }

        const osvjezi = {
          nizNekretnina : marketing.filter(item => nizNekretnina.includes(item.id))
        }

        if(req.session.nekretnine == ""){
          console.log("nista")
          res.status(200).json()
        }
        else{
          req.session.nekretnine = ""
          console.log("vratio")
          console.log(osvjezi)
          res.status(200).json(osvjezi)
        }

      } catch (error) {
        console.error('Error parsing JSON data: ', error);
      } 
    });

});
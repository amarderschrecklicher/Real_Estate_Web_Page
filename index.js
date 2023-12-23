const express = require('express');
const fs = require('fs');
const bcrypt = require('bcrypt');
const path = require('path');
const bodyParser = require('body-parser')
const session = require("express-session")
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
    resave: true,
    saveUninitialized: true,
 }));

const filePath = path.join(__dirname, 'data', 'korisnici.json');
const filePath2 = path.join(__dirname, 'data', 'nekretnine.json');

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
        res.status(200).json(nekretnine)
      } catch (error) {
        console.error('Error parsing JSON data: ', error);
      }
    });
    
});

app.post('/marketing/nekretnine',function(req,res){
    

});

app.post('/marketing/nekretnina/:id',function(req,res){
    

});
app.post('/marketing/osvjezi',function(req,res){
    

});
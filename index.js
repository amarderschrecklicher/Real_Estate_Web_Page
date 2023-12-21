const express = require('express');
const fs = require('fs');
const bcrypt = require('bcrypt');
const path = require('path');
const bodyParser = require('body-parser')
const app = express();
app.use(express.static('public'));
app.listen(3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const filePath = path.join(__dirname, 'data', 'korisnici.json');

app.post('/login',function(req,res){
    const { username, password } = req.body;
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }   
        try {
          bcrypt.hash(password, 10, function(err, hash) {
            const korisnici = JSON.parse(data);
            var a = korisnici.find(korisnik => korisnik.username == username && korisnik.password == hash)
            if(a){
                res.status(200).json({poruka:"Uspješna prijava"})
                req.session.username = username;
            }
            else {
                res.status(401).json({poruka:"Neuspješna prijava"})
            }
            });  

        } catch (error) {
          console.error('Error parsing JSON data:', error);
        }
      });
});

app.post('/logout',function(req,res){
    
   
});
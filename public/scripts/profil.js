const ime = document.getElementById("name");
const prezime = document.getElementById("surname");
const username = document.getElementById("username");
const password = document.getElementById("password");
const button= document.getElementById("azuriraj");
PoziviAjax.getKorisnik(setUser)

button.addEventListener('click',azuriraj)

function setUser(error,data){
    if(error) throw error

    ime.placeholder = data.ime
    prezime.placeholder = data.prezime
    username.placeholder = data.username
}

function azuriraj(){
    const noviPodaci = {
        ime: ime.value,
        prezime: prezime.value,
        username: username.value,
        password: password.value
      };

    if(!ime)
      noviPodaci.ime = ime.placeholder
    if(!prezime)
      noviPodaci.prezime = prezime.placeholder
    if(!username)
      noviPodaci.username = username.placeholder

    PoziviAjax.putKorisnik(noviPodaci,setData)
}

function setData(error,data){
    if(error) throw error

    location.reload();
}
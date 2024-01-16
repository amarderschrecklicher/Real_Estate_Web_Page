const unos_upita = document.getElementById("unos_upita");
const tekst_upita = document.getElementById("comment");
const result_upita = document.getElementById("result");
const upiti_nekretnine = document.getElementById("lista_upita");

unos_upita.style.display = "none";

PoziviAjax.getKorisnik(check);

function popuniUpite(error,data){
const nekretnina = data.nekretnina
const upiti = nekretnina.upiti
let string = ""
upiti.forEach(upit => {
string+=`<li><p class='name'>${upit.username}</p><p>${upit.tekst_upita}</p></li>`
})
upiti_nekretnine.innerHTML = string
}

function check(error,data){
    if(data){
       unos_upita.style.display = "";
    }
}

function sendUpit(){
    PoziviAjax.postUpit(propertyId,tekst_upita.value,upitResult)
}

function upitResult(error,data){
    
    if(error){
        result_upita.value = error.greska
    }
    else {
        const urlParams = new URLSearchParams(window.location.search);
        const propertyId = urlParams.get('id');
        result_upita.value  = data
        PoziviAjax.getNekretnina(propertyId,popuniUpite)
    }
}
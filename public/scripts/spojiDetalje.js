const naziv_nekretnine = document.getElementById("naziv");
const kvadratura_nekretnine = document.getElementById("kvadratura");
const cijena_nekretnine = document.getElementById("cijena");
const grijanje_nekretnine = document.getElementById("grijanje");
const godina_nekretnine = document.getElementById("godina");
const lokacija_nekretnine = document.getElementById("lokacija");
const datum_nekretnine = document.getElementById("datum");
const opis_nekretnine = document.getElementById("opis");

const urlParams = new URLSearchParams(window.location.search);
const propertyId = urlParams.get('id');
PoziviAjax.getNekretnina(propertyId,popuniDetalje)


function popuniDetalje(error,data){
    if(error) throw error

    const nekretnina = data.nekretnina

    naziv_nekretnine.value = nekretnina.naziv
    kvadratura_nekretnine.value = nekretnina.kvadratura
    grijanje_nekretnine.value = nekretnina.tip_grijanja
    cijena_nekretnine.value = nekretnina.cijena
    godina_nekretnine.value = nekretnina.godina_izgradnje
    lokacija_nekretnine.value = nekretnina.lokacija
    datum_nekretnine.value = nekretnina.datum_objave
    opis_nekretnine.innerHTML = nekretnina.opis
    
    const upiti = nekretnina.upiti
    let string = ""
    upiti.forEach(upit => {
    string+=`<li><p class='name'>${upit.username}</p><p>${upit.tekst_upita}</p></li>`
    })
    upiti_nekretnine.innerHTML = string

}


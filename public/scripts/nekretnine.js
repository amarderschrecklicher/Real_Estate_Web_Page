function spojiNekretnine(divReferenca, instancaModula, tip_nekretnine) {
    // pozivanje metode za filtriranje
   let nekretnine = instancaModula.filtrirajNekretnine({ tip_nekretnine: tip_nekretnine });
    // iscrtavanje elemenata u divReferenca element

    let string = ""
    let container = tip_nekretnine
    if(container=="Poslovni prostor")
    container="Poslovni_prostor"

    for(let nekretnina of nekretnine){
     string += "<h3>"+tip_nekretnine+"</h3><div id='"+container+"' class='grid-container'>"+
     " <div> <img src= '../images/apartments.jpg' alt='Appartment'> <br> <p class='lijevo'><strong>Naziv:</strong> "+ nekretnina.naziv+"</p>" +
     "<p class='lijevo'><strong>Kvadratura:</strong> "+ nekretnina.kvadratura +" m2</p>" +
     "<p class='desno'><strong>Cijena:</strong> "+nekretnina.cijena +" KM</p><button>Detalji</button></div></div>"
    }

    divReferenca.innerHTML = string  
}

const divStan = document.getElementById("stan");
const divKuca = document.getElementById("kuca");
const divPp = document.getElementById("pp");
const min_cijena = document.getElementById("min_cijena")
const max_cijena = document.getElementById("max_cijena")
const min_kvadrati = document.getElementById("min_kvadrati")
const max_kvadrati = document.getElementById("max_kvadrati")
var filter = false

PoziviAjax.getNekretnine(fillNekretnine)

function filterNekretnine(){
    filter = true
    PoziviAjax.getNekretnine(fillNekretnine)
}

function fillNekretnine(error,data){

if(error) throw error

//instanciranje modula
let nekretnine = SpisakNekretnina();
nekretnine.init(data,null);

if(filter){
    console.log(min_cijena.value)
    const kriterij = {
        max_cijena:max_cijena.value,
        min_cijena:min_cijena.value,
        max_kvadratura:max_kvadrati.value,
        min_kvadratura:min_kvadrati.value
    }
    filter = false
    nekretnine.filtrirajNekretnine(kriterij)
}

//pozivanje funkcije
spojiNekretnine(divStan, nekretnine, "Stan");
spojiNekretnine(divKuca, nekretnine, "Kuća");
spojiNekretnine(divPp, nekretnine, "Poslovni prostor");

}


/*
const listaNekretnina = [{
    id: 1,
    tip_nekretnine: "Stan",
    naziv: "Useljiv stan Sarajevo",
    kvadratura: 58,
    cijena: 232000,
    tip_grijanja: "plin",
    lokacija: "Novo Sarajevo",
    godina_izgradnje: 2019,
    datum_objave: "01.10.2023.",
    opis: "Sociis natoque penatibus.",
    upiti: [{
        korisnik_id: 1,
        tekst_upita: "Nullam eu pede mollis pretium."
    },
    {
        korisnik_id: 2,
        tekst_upita: "Phasellus viverra nulla."
    }]
},
{
    id: 2,
    tip_nekretnine: "Poslovni prostor",
    naziv: "Mali poslovni prostor",
    kvadratura: 20,
    cijena: 70000,
    tip_grijanja: "struja",
    lokacija: "Centar",
    godina_izgradnje: 2005,
    datum_objave: "20.08.2023.",
    opis: "Magnis dis parturient montes.",
    upiti: [{
        korisnik_id: 2,
        tekst_upita: "Integer tincidunt."
    },
    
    ]
},{
    id: 3,
    tip_nekretnine: "Kuća",
    naziv: "Mala Kuća",
    kvadratura: 88,
    cijena: 232000,
    tip_grijanja: "plin",
    lokacija: "Novo Sarajevo",
    godina_izgradnje: 2019,
    datum_objave: "01.10.2023.",
    opis: "Sociis natoque penatibus.",
    upiti: [{
        korisnik_id: 1,
        tekst_upita: "Nullam eu pede mollis pretium."
    },
    {
        korisnik_id: 2,
        tekst_upita: "Phasellus viverra nulla."
    }]
}]

const listaKorisnika = [{
    id: 1,
    ime: "Neko",
    prezime: "Nekic",
    username: "username1",
},
{
    id: 2,
    ime: "Neko2",
    prezime: "Nekic2",
    username: "username2",
}]
*/

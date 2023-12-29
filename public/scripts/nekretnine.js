function spojiNekretnine(divReferenca, instancaModula, tip_nekretnine) {
    // pozivanje metode za filtriranje
   let nekretnine = instancaModula.filtrirajNekretnine({ tip_nekretnine: tip_nekretnine });
    // iscrtavanje elemenata u divReferenca element

    let string = ""
    let container = tip_nekretnine
    if(container=="Poslovni prostor")
    container="Poslovni_prostor"

    string += "<h3>"+tip_nekretnine+"</h3><div id='"+ container +"' class='grid-container'>"
    for(let nekretnina of nekretnine){
     string += " <div id='kartica-"+nekretnina.id+"'> <img src= '../images/apartments.jpg' alt='Appartment'> <br> <p class='lijevo'><strong>Naziv:</strong> "+ nekretnina.naziv +"</p>" +
     "<p class='lijevo'><strong>Kvadratura:</strong> "+ nekretnina.kvadratura +" m2</p>" +
     "<p class='desno'><strong>Cijena:</strong> "+ nekretnina.cijena +" KM</p><button id='detalji-"+nekretnina.id+"'onclick='povecajKarticu("+nekretnina.id+","+container+")'>Detalji</button>" +
     "<div id='pretrage-"+nekretnina.id+"'><p class='lijevo'><strong>Pretrage: </strong><span id='br_pretraga' class='label'>"+
     "</span></p></div><div id='klikovi-"+nekretnina.id+"'>"+
     "<p class='lijevo'><strong>Klikovi: </strong><span id='br_klikova' class='label'></span></p></div></div>"
   
    }
    string +="</div>"

    divReferenca.innerHTML = string  
}

const divStan = document.getElementById("stan");
const divKuca = document.getElementById("kuca");
const divPp = document.getElementById("pp");
const min_cijena = document.getElementById("min_cijena")
const max_cijena = document.getElementById("max_cijena")
const min_kvadrati = document.getElementById("min_kvadrati")
const max_kvadrati = document.getElementById("max_kvadrati")
const detalji = document.getElementById("detalji")
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

var povecana_kartica = 0
function povecajKarticu(id,tip){
  const kartica = document.getElementById("kartica-" + id);
  
  if (povecana_kartica) {
    povecana_kartica.classList.remove("large-item");
  }

  kartica.classList.add("large-item");
  povecana_kartica = kartica;
}

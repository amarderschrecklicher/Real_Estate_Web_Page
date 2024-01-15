const naziv_nekretnine = document.getElementById("naziv");
const kvadratura_nekretnine = document.getElementById("kvadratura");
const cijena_nekretnine = document.getElementById("cijena");
const grijanje_nekretnine = document.getElementById("grijanje");
const godina_nekretnine = document.getElementById("godina");
const lokacija_nekretnine = document.getElementById("lokacija");
const datum_nekretnine = document.getElementById("datum");
const opis_nekretnine = document.getElementById("opis");
const upiti_nekretnine = document.getElementById("lista_upita");

const urlParams = new URLSearchParams(window.location.search);
const propertyId = urlParams.get('id');
PoziviAjax.getNekretnina(propertyId,popuniNekretninu)

function popuniNekretninu(error,data){
    if(error) throw error

    const nekretnina = data.nekretnina

    naziv_nekretnine.value = nekretnina.naziv
    kvadratura_nekretnine.value = nekretnina.kvadratura
    grijanje_nekretnine.value = nekretnina.tip_grijanja
    cijena_nekretnine.value = nekretnina.cijena
    godina_nekretnine.value = nekretnina.godina_izgradnje
    lokacija_nekretnine.value = nekretnina.lokacija
    datum_nekretnine.value = nekretnina.datum_objave
    opis_nekretnine.value = nekretnina.opis

    const upiti = nekretnina.upiti
    let string = ""

   upiti.forEach(upit => {
    string+=`<li><p class='name'>${upit.username}</p><p>${upit.tekst_upita}</p></li>`
   })

   upiti_nekretnine.innerHTML = string

}


 
/*
<ul>
            <li>
                <p class="name">Korisnik</p>
                <p>opis opis opis</p>
            </li>
            <li>
                <p class="name">Korisnik2</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem quam minima omnis esse porro possimus non sapiente, vero sit libero consequuntur laudantium, dolor officiis illum neque rem nobis, iure inventore.
                </p>   
                </li>
        </ul>
*/

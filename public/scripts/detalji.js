const naziv_nekretnine = document.getElementById("naziv");
const kvadratura_nekretnine = document.getElementById("kvadratura");
const cijena_nekretnine = document.getElementById("cijena");
const grijanje_nekretnine = document.getElementById("grijanje");
const godina_nekretnine = document.getElementById("godina");
const lokacija_nekretnine = document.getElementById("lokacija");
const datum_nekretnine = document.getElementById("datum");
const opis_nekretnine = document.getElementById("opis");
const upiti_nekretnine = document.getElementById("upiti");

const urlParams = new URLSearchParams(window.location.search);
const propertyId = urlParams.get('id');



 
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


naziv_nekretnine.value = propertyId
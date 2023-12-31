let SpisakNekretnina = function () {
    //privatni atributi modula
    let listaNekretnina = [];
    let listaKorisnika = [];


    //implementacija metoda
    let init = function (nekretnine, korisnici) {
       listaNekretnina = nekretnine
       listaKorisnika = korisnici
    }

    let filtrirajNekretnine = function (kriterij) {

        if(kriterij == null)
            return listaNekretnina
        
        let nekretnine = listaNekretnina
        
        if(kriterij.tip_nekretnine)
            nekretnine = nekretnine.filter(nek => nek.tip_nekretnine == kriterij.tip_nekretnine)
        if(nekretnine.length!=0 && kriterij.max_cijena)
            nekretnine = nekretnine.filter(nek => nek.cijena <= kriterij.max_cijena)
        if(nekretnine.length!=0 && kriterij.min_cijena)
            nekretnine = nekretnine.filter(nek => nek.cijena >= kriterij.min_cijena)
        if(nekretnine.length!=0 && kriterij.max_kvadratura)
            nekretnine = nekretnine.filter(nek => nek.kvadratura <= kriterij.max_kvadratura)
        if(nekretnine.length!=0 && kriterij.min_kvadratura)
            nekretnine = nekretnine.filter(nek => nek.kvadratura >= kriterij.min_kvadratura)  

        return nekretnine
    }

    let ucitajDetaljeNekretnine = function (id) {
        return listaNekretnina.find(nek => nek.id == id)
    }


    return {
        init: init,
        filtrirajNekretnine: filtrirajNekretnine,
        ucitajDetaljeNekretnine: ucitajDetaljeNekretnine
    }
};
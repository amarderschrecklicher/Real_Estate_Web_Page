const MarketingAjax = (() => {

    var  lista_osvjezi = 0
    const divs = ["#Stan","#Kuća","#Poslovni_prostor"]

    function osvjeziPretrage(divNekretnine){

        divs.forEach(tip => {
        
        lista_osvjezi.nizNekretnina.forEach(nekretnina => {
                const kartica = divNekretnine.querySelector(tip).querySelector("#kartica-"+nekretnina.id)
                if(kartica){
                    const br_pretrage = kartica.querySelector("#pretrage-"+nekretnina.id).querySelector("#br_pretraga")
                    const br_klikova = kartica.querySelector("#klikovi-"+nekretnina.id).querySelector("#br_klikova")

                    if(nekretnina.pretrage && nekretnina.pretrage!=0){
                        br_pretrage.innerHTML = nekretnina.pretrage
                        br_pretrage.style.display = ""        
                    }   
                    if(nekretnina.klikovi && nekretnina.klikovi!=0){
                        br_klikova.innerHTML = nekretnina.klikovi
                        br_klikova.style.display = ""           
                    }  
                }
            })
            
        })

    }

    function osvjeziKlikove(divNekretnine){
        const ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function(){
            if (ajax.readyState == 4 && ajax.status == 200){
                lista_osvjezi = JSON.parse(ajax.responseText)
                osvjeziPretrage(divNekretnine)
            }            
            else if (ajax.readyState == 4){
                
            };
        }

        var list = {
            nizNekretnina:[]
        }

        divs.forEach(tip => {

            var div = divNekretnine.querySelector(tip).querySelectorAll('[tag="kartica"]');

            div.forEach(element => {
                list.nizNekretnina.push(parseInt(element.id.split('-')[1],10))
            });
        })
        

        ajax.open('POST','/marketing/osvjezi');
        ajax.setRequestHeader('Content-Type', 'application/json');

        var old = 0
        if(lista_osvjezi!=0){
           old = lista_osvjezi.nizNekretnina.map(x=>x.id)
        }
        var eqaul = true
        if(old !=0){
            list.nizNekretnina.forEach(id => {
                if(old.find(x=> x == id)==[]){
                    eqaul = false
                    return
                }
            });
        }

        if(!eqaul)
            ajax.send(JSON.stringify(list));
        else
            ajax.send();

    }

    function novoFiltriranje(listaFiltriranihNekretnina){
        const ajax = new XMLHttpRequest();

        console.log(listaFiltriranihNekretnina)

        var list = {
        nizNekretnina:[]
        }
        listaFiltriranihNekretnina.forEach(nekretnina =>{
            list.nizNekretnina.push(nekretnina.id)
        })

        ajax.open('POST','/marketing/nekretnine');
        ajax.setRequestHeader('Content-Type', 'application/json');
        ajax.send(JSON.stringify(list)); 

    }
    
    function klikNekretnina(idNekretnine){
        const ajax = new XMLHttpRequest();

        ajax.open('POST',`/marketing/nekretnina/${idNekretnine}`);
        ajax.send();

    }



    return {
        osvjeziPretrage: osvjeziPretrage,
        osvjeziKlikove: osvjeziKlikove,
        novoFiltriranje: novoFiltriranje,
        klikNekretnina: klikNekretnina,
    };
})();
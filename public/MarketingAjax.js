const MarketingAjax = (() => {

    var  lista_osvjezi = []

    function osvjeziPretrage(divNekretnine){

            for(nekretnina in divNekretnine){
                const br_pretrage = divNekretnine.getElementById("pretrage-"+nekretnina.id).getElementById("br_pretraga")
                const br_klikova = divNekretnine.getElementById("klikovi-"+nekretnina.id).getElementById("br_klikova")
                const marketing = lista_osvjezi.find(x=>x.id == nekretnina.id)
                br_pretrage.value = marketing.br_pretrage
                br_klikova.value = marketing.br_klikova
            }

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

            var list = {
                nizNekretnina:[]
            }
            for(nekretnina in  divNekretnine){
                list.nizNekretnina.push(nekretnina.id)
            }
            console.log(JSON.stringify(list))

            ajax.open('POST','/marketing/osvjezi');
            ajax.setRequestHeader('Content-Type', 'application/json');
            if(list.nizNekretnina != [])
                ajax.send(JSON.stringify(list));
            else
                ajax.send();

        }

    }

    function novoFiltriranje(listaFiltriranihNekretnina){
        const ajax = new XMLHttpRequest();

        ajax.onreadystatechange = function(){
            if (ajax.readyState == 4 && ajax.status == 200){
                
            }            
            else if (ajax.readyState == 4){
                
            };
        }
        
        var list = {
        nizNekretnina:[]
        }
        for(nekretnina in  listaFiltriranihNekretnina){
            list.nizNekretnina.push(nekretnina.id)
        }
        
        console.log(JSON.stringify(list))

        ajax.open('POST','/marketing/nekretnine');
        ajax.setRequestHeader('Content-Type', 'application/json');
        ajax.send(JSON.stringify(list)); 

    }
    
    function klikNekretnina(idNekretnine){
        const ajax = new XMLHttpRequest();

        ajax.onreadystatechange = function(){
            if (ajax.readyState == 4 && ajax.status == 200){
                
            }            
            else if (ajax.readyState == 4){
                
            };

        }

        ajax.open('POST',`/marketing/nekretnina/${idNekretnine}`);
        ajax.send();

    }



    return {
        osvjeziPretrage: osvjeziPretrage,
        osvjeziKlikove: osvjeziKlikove,
        novoFiltriranje: novoFiltriranje,
        klikNekretnina: klikNekretnina,
    };
});
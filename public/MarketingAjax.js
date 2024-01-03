const MarketingAjax = (() => {

    var parametar = ""
    let initialExecution = true;
    const interval = setInterval(() => {
        osvjeziKlikove(parametar);
        if (!initialExecution) {
          clearInterval(interval);
          setInterval(() => osvjeziKlikove(parametar), 500);
        }
      }, 500);

    var lista_osvjezi = 0
    var list = {
        nizNekretnina:[]
    }
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
        parametar = divNekretnine
        initialExecution = false;
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

        ajax.open('POST','/marketing/osvjezi');
        ajax.setRequestHeader('Content-Type', 'application/json');

       console.log(list.nizNekretnina)
        if(list.nizNekretnina.length != 0){
            console.log("uso gore")
            ajax.send(JSON.stringify(list));
            list.nizNekretnina = []
        }
        else{
            console.log("uso dolje")
            ajax.send();
        }
    }

    function novoFiltriranje(listaFiltriranihNekretnina){
        const ajax = new XMLHttpRequest();

        list = {
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

        list = {
        nizNekretnina:[]
        }
        list.nizNekretnina.push(idNekretnine)

        ajax.open('POST',`/marketing/nekretnina/${idNekretnine}`);
        ajax.send();

    }

    return {
        osvjeziPretrage: osvjeziPretrage,
        osvjeziKlikove: osvjeziKlikove,
        novoFiltriranje: novoFiltriranje,
        klikNekretnina: klikNekretnina
    };
})();
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

    const lista_osvjezi = []
    const list = {
        nizNekretnina:[]
    }
    const divs = ["#Stan","#Kuća","#Poslovni_prostor"]
    var start = 1

    function osvjeziPretrage(divNekretnine){
        console.log("front")
        console.log(lista_osvjezi)
        divs.forEach(tip => {
        
        lista_osvjezi.forEach(nekretnina => {
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

        if(start == 1){
        const ajax = new XMLHttpRequest();

        ajax.onreadystatechange = function(){
            if (ajax.readyState == 4 && ajax.status == 200){
                if(ajax.responseText!=""){
                const newData = JSON.parse(ajax.responseText).nizNekretnina;
                lista_osvjezi.length = 0    
                newData.forEach(item => {
                    const existingItemIndex = lista_osvjezi.findIndex(el => el.id === item.id);
                    if (existingItemIndex !== -1) {
                      // Update existing item
                      lista_osvjezi[existingItemIndex] = item;
                    } else {
                      // Add new item if it doesn't exist
                      lista_osvjezi.push(item);
                    }
                  });
                  localStorage.setItem('myArray', JSON.stringify(lista_osvjezi));
                }
                else{
                    const storedArrayString = localStorage.getItem('myArray');
                    const retrievedArray = JSON.parse(storedArrayString);
                    retrievedArray.forEach(item => {
                        const existingItemIndex = lista_osvjezi.findIndex(el => el.id === item.id);
                        if (existingItemIndex !== -1) {
                          // Update existing item
                          lista_osvjezi[existingItemIndex] = item;
                        }
                      });
                }
                
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
            list.nizNekretnina.length = 0
        }
        else{
            console.log("uso dolje")
            ajax.send();
        }
        }
    }

    function novoFiltriranje(listaFiltriranihNekretnina){
        const ajax = new XMLHttpRequest();

        ajax.onreadystatechange = function(){
            if (ajax.readyState == 4 && ajax.status == 200){
                start = 1
            }            
            else if (ajax.readyState == 4){     
            };
        }

        list.nizNekretnina.length = 0


        listaFiltriranihNekretnina.forEach(nekretnina =>{
            const existingItemIndex = list.nizNekretnina.findIndex(el => el.id === nekretnina.id);
                    if (existingItemIndex !== -1) {
                      // Update existing item
                      list.nizNekretnina[existingItemIndex] = nekretnina.id;
                    } else {
                      // Add new item if it doesn't exist
                      list.nizNekretnina.push(nekretnina.id);
                    }
        })

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

        list.nizNekretnina.length = 0
        const existingItemIndex = list.nizNekretnina.findIndex(el => el.id === idNekretnine);
                    if (existingItemIndex !== -1) {
                      // Update existing item
                      list.nizNekretnina[existingItemIndex] = idNekretnine;
                    } else {
                      // Add new item if it doesn't exist
                      list.nizNekretnina.push(idNekretnine);
                    }

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
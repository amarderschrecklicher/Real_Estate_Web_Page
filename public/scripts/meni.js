const prijava = document.getElementById("prijava");

function callLogout(){
    if(prijava.innerHTML=="Odjava")
    PoziviAjax.postLogout(logout)
}
prijava.addEventListener('click',callLogout)

function logout(error,data){
    if(error) throw  error

    if(prijava.innerHTML=="Prijava")
        prijava.innerHTML="Odjava"
    else
        prijava.innerHTML="Prijava"
}

document.addEventListener('DOMContentLoaded', function() {
    const shouldUpdate = localStorage.getItem('updateHeader');
    if (shouldUpdate === 'true') {
      document.getElementById('prijava').innerHTML = 'Odjava';
      localStorage.removeItem('updateHeader');
    }
  });


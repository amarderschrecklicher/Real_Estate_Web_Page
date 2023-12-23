const username = document.getElementById("username");
const password = document.getElementById("password");
const button = document.getElementById("loginButton");
const message = document.getElementById("login");

function callLogin(){
    PoziviAjax.postLogin(username.value, password.value, login)
}

function login(error,data){
    if(error) {
        message.innerHTML = JSON.parse(error).poruka;
        throw error;
    }
    window.location.href = 'http://localhost:3000/nekretnine.html'
}



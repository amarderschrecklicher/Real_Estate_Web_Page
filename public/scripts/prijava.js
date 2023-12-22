const ajax = PoziviAjax();
const username = document.getElementById("username");
const password = document.getElementById("password");
const button = document.getElementById("loginButton");
const message = document.getElementById("login");

button.addEventListener('click',callLogin);

function callLogin(){
ajax.impl_postLogin(username.nodeValue, password.nodeValue, login)
}

function login(error,data){
    if(error) throw error;
    message.innerHTML = data;
}



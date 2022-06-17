import { twoArrayEqual, setCookie } from './tools.js';

window.addEventListener("load",inicio,false);

function inicio(){
  document.getElementById("aceptarAdmin").addEventListener("click",validarAdmin,false);
}

function validarAdmin(){
  const pwsArray = [97, 100, 109, 105, 110,  46, 84, 114,  97, 110, 115, 102, 111, 114, 109,  97, 114,  46, 50,  48,  50,  50]; 
  const usuario = document.getElementById("usuario");
  const password = document.getElementById("password");
  if (usuario.value == "" ){
    usuario.focus()
    return false
  }  
  if (password.value == "" ){
    password.focus()
    return false
  }
  if (usuario.value != "admin" ){
    usuario.focus()
    return false
  }  
  let newPasswaord = Array.from(password.value);
  let pws = newPasswaord.map(e => e.charCodeAt(0));
  if(twoArrayEqual(pwsArray,pws)){
    setCookie("admin","loginAdmin",0.0417);
    location.href="login-alumno.html"
  } else {
    alert("Usuario y/o passwaord incorrectos");
  }
}

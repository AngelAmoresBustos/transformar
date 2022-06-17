import { twoArrayEqual, getCookie } from './tools.js';

window.addEventListener("load",inicio,false);

function inicio(){
  document.getElementById("aceptarAlumno").addEventListener("click",validarAlumno,false);
}

function validarAlumno(){
  if(getCookie("admin") == ""){
    location.href="index.html";
  }
  const pwsArray = [118,  97, 109, 111, 115, 46,  88,  46, 116, 111, 100, 111];
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
  if (usuario.value != "alumno" ){
    usuario.focus()
    return false
  }  
  let newPasswaord = Array.from(password.value);
  let pws = newPasswaord.map(e => e.charCodeAt(0));
  twoArrayEqual(pwsArray,pws) ? location.href="examen.html" : alert("Usuario y/o passwaord incorrectos");
}

import { preguntaAtencioncionConceptracion } from './antencionyconcentracion.js';
import { preguntaRazonamientoVerbal }  from './razonamientoverbal.js';
import { preguntaRazonamientoLogico }  from './razonamientologico.js';
import { preguntaRazonamientoNumerico } from './razonamientonumerico.js';
import { getCookie, capturarRadioButton, getRandomInt } from './tools.js';
window.addEventListener("load",inicio,false);
const maximoPreguntas = 40;
let indicesDePreguntas = {};
let aciertosPorMateria = {};
let respuestas = [];
let aciertos = [];
let contadorDeMaterias = 1;
const nombreMaterias = {
  1:"Atención y concentración",
  2:"Razonamiento verbal",
  3:"Razonamiento Numérico",
  4:"Razonamiento Lógico"
};
const tiempos = {
  1:11,
  2:17,
  3:17,
  4:15
};
let minuto = tiempos[1];
let segundo = 0;
let timer;
// con esta función arranca todo
function inicio(){
  if(getCookie("admin") == ""){
    location.href="index.html";
  }
  document.getElementById("next").addEventListener("click",siguientePregunta,false);
  document.getElementById("materia").innerText = nombreMaterias[contadorDeMaterias];
  document.getElementById("cantidadPreguntas").innerText = maximoPreguntas;
  document.getElementById("cantidadPreguntasTitulo").innerText = maximoPreguntas;
  document.getElementById("tiempoMaximo").innerText = tiempos[1];
  contadordeMinutos();
  siguientePregunta();
}

// funcion para controlar el tiempo de la prueba
function contadordeMinutos(){
  if(segundo == 0){
    segundo = 60;
    minuto--;
  }
  segundo--;
  let segundoEtiqueta;
  let minutoEtiqueta;
  segundo<10 ? segundoEtiqueta = "0"+segundo : segundoEtiqueta = segundo;
  minuto<10 ? minutoEtiqueta = "0"+minuto : minutoEtiqueta = minuto;
  let horaImprimible = minutoEtiqueta + " : " + segundoEtiqueta;
  document.getElementById("reloj").innerHTML = horaImprimible;
  if(segundo == 0 && minuto == 0){
    clearTimeout(timer);
    alert(`Lo sentimos, tiempo terminado para ${nombreMaterias[contadorDeMaterias]}`);
    continuarExamen();
    document.getElementById("next").setAttribute("disabled","disabled");
  } else {
    timer = setTimeout(contadordeMinutos,1000);
  }
}

// Funcion asignada al boton para avanzar preguntas y materias
function siguientePregunta(){
  let preguntaNumero = parseInt(document.getElementById("preguntaNumero").innerText);
  let radioButtonName = document.getElementsByName("opcionesDeRespuesta");
  let respuesta = capturarRadioButton(radioButtonName);
  aciertos.push(respuesta);
  preguntaNumero++;
  if(preguntaNumero <= maximoPreguntas){
    document.getElementById("preguntaNumero").innerText = preguntaNumero;
    damePreguntas();
  } else { 
    if(contadorDeMaterias<4){
      clearTimeout(timer);
      alert(`Felicitaciones, terminate la prueba ${nombreMaterias[contadorDeMaterias]} transforma 2022`);
      continuarExamen();
    } else {
      clearTimeout(timer);
      aciertosPorMateria[contadorDeMaterias] = contarAciertos();
      presentarResultados();
    }
  }
}

function continuarExamen(){
  aciertosPorMateria[contadorDeMaterias] = contarAciertos();
  contadorDeMaterias++;
  minuto = tiempos[contadorDeMaterias];
  segundo = 0;
  document.getElementById("preguntaNumero").innerText = "1";
  document.getElementById("materia").innerText = nombreMaterias[contadorDeMaterias];
  document.getElementById("tiempoMaximo").innerText = tiempos[contadorDeMaterias];
  damePreguntas();
  contadordeMinutos();
}

// Funcion que cuenta los aciertos de una prueba
function contarAciertos(){
  let contadorAciertos = 0;
  for(let k=0; k<maximoPreguntas; k++)
    if(respuestas[k] == aciertos[k])
      contadorAciertos++;
    //inicializamos array para nueva materia
    respuestas = []; 
    aciertos = [];
  return contadorAciertos;
}

// función que genera una pregunta random de cualquier materia
function generarPreguntaRandom(){
  let repetido = false;
  let randomPregunta;
  while(!repetido){
    randomPregunta = getRandomInt(1,360);
    if(!indicesDePreguntas[randomPregunta]){
      indicesDePreguntas[randomPregunta] = randomPregunta;
      repetido = true;
    }
  }
  return randomPregunta;
}

function damePreguntas(){
  const preguntasPorMateria = {
    1:preguntaAtencioncionConceptracion,
    2:preguntaRazonamientoVerbal,
    3:preguntaRazonamientoNumerico,
    4:preguntaRazonamientoLogico
  };
  let randomPregunta = generarPreguntaRandom();
  const pregunta = preguntasPorMateria[contadorDeMaterias](randomPregunta);
  let len_result = evitarElementosVacios(pregunta);
  respuestas.push(pregunta[len_result]);
  formarPreguntas(pregunta,len_result);
}

function evitarElementosVacios(miArray){
  let len_result = miArray.length-1;
  if(miArray[len_result] == ""){ // para evitar elementos vacios de array de la pregunta
    miArray.pop();
    len_result--;
  } 
  return len_result--;
}

//Funcion para formatear la pregunta y sus respuestas
function formarPreguntas(pregunta,len_result){
  document.getElementById("nombrePregunta").innerText = pregunta[0];
  let opciones = "";
  for(let j=1; j<len_result; j++){
    let opcion =`<div class="radio mt-2">
      <label>
        <input type="radio" name="opcionesDeRespuesta" id="optionsRadios${j}" value="${j}">
        ${pregunta[j]}
      </label>
    </div>`;
    opciones += opcion;
  }
  document.getElementById("posiblesRespuesta").innerHTML = opciones;
}

//Funcion para formatear los resultados y presentar
function presentarResultados(){
  document.getElementById("topCard").innerHTML ="Tus aciertos";
  document.getElementById("nombrePregunta").classList.add("invisible");
  document.getElementById("top").classList.add("invisible");
  document.getElementById("next").classList.add("invisible");
  let opciones = "";
  let calificacion;
  for(let j=1; j<5; j++){
    aciertosPorMateria[j] == undefined ? calificacion = 0 : calificacion = aciertosPorMateria[j];
    let opcion = `<div class="row mb-2">
        <div class="col-md-6">${nombreMaterias[j]}</div>
        <div class="col-md-6">${calificacion}</div>
      </div>`;
    opciones += opcion;
  }
  document.getElementById("posiblesRespuesta").innerHTML = opciones;
}

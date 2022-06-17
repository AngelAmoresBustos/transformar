
export function twoArrayEqual(array1, array2) {
  let i = array1.length;
  if (i != array2.length) return false;
  while (i--) {
    if (array1[i] !== array2[i]) return false;
  }
  return true;
}

export function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export function capturarRadioButton(porNombre){
  var resultado="ninguno";
  for(var i=0;i<porNombre.length;i++)
    if (porNombre[i].checked) resultado=porNombre[i].value; 
  return resultado;
}

export function getRandomInt(min, max){
  return Math.floor(Math.random() * ((max+1) - min)) + min;
}
$(document).ready(function(){
    var dificultad = getParameterByName('dif');
    var escenario = getParameterByName('escenario');
    var nombre = getParameterByName('nombre');

    var url = generarURL(dificultad, escenario, nombre);

    $('#home').click(function() {
        $(location).attr('href', '../html/Inicio.html' + url);
    })

    $('#back').click(function() {
        $(location).attr('href', '../html/Inicio.html' + url);
    })

    $('#config').click(function() {
        $(location).attr('href', '../html/configuraciones.html' + url);
    })
    
    $('.esce1').click(function() {
        url = generarURL(dificultad, '1', nombre);
        $(location).attr('href', '../html/Pantalla_Juego.html' + url);
    })

    $('.esce2').click(function() {
        url = generarURL(dificultad, '2', nombre);
        $(location).attr('href', '../html/Pantalla_Juego.html' + url);
    })

    $('.esce3').click(function() {
        url = generarURL(dificultad, '3', nombre);
        $(location).attr('href', '../html/Pantalla_Juego.html' + url);
    })
});

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function generarURL(dif, esc, nom) {
    var url = '?dif=' + dif + '&escenario=' + esc + '&nombre=' + nom;
    return url;
}
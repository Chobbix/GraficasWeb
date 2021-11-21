$(document).ready(function(){
    var dificultad = getParameterByName('dif');
    var escenario = getParameterByName('escenario');
    var nombre = getParameterByName('nombre');

    var url = generarURL(dificultad, escenario, nombre);

    console.log(dificultad);

    if(dificultad == '1') {
        $('#switch').prop('checked', false);
    } else {
        $('#switch').prop('checked', true);
        dificultad == '2'
    }

    $('#switch').click(function() {
        if( $(this).prop('checked') ) {
            $(location).attr('href','Inicio.html?dif=2');
        } else {
            $(location).attr('href','Inicio.html?dif=1');
        }
    })

    $('#start').click(function() {
        $(location).attr('href', '../html/Pantalla_Juego.html' + url);
    })

    $('#Escenarios').click(function() {
        $(location).attr('href', '../html/Escenarios.html' + url);
    })

    $('#Multi').click(function() {
        $(location).attr('href', '../html/Pantalla_Juego_Multijugador.html' + url);
    })

    $('#Puntuaciones').click(function() {
        $(location).attr('href', '../html/Puntuaciones.html' + url);
    })

    $('#Configuraciones').click(function() {
        $(location).attr('href', '../html/Configuraciones.html' + url);
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
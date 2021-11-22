<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="../css/Inicio_style.css" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Tourney:wdth,wght@97.2,494&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=DotGothic16&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Dhurjati&family=DotGothic16&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css">
    <link rel="shortcut icon" href="../Elementos/Universe_defenders.png" type="image/x-icon">

    <title>Menu Inicio</title>


    <script type="text/javascript">

        $(document).ready(function () {

            var dificultad = localStorage.getItem("Dificultad");
            var nombre = localStorage.getItem("Nombre");
            var escenario = localStorage.getItem("Escenario");

        });
    </script>

</head>

<body>

    <iframe src="../Elementos/Música ambiental _8 Ambiente espacial (No copyright)(MP3_128K).mp3" type="audio/mp3"
        allow="autoplay" id="audio" style="display:none"></iframe>
    <audio autoplay loop id="mainAudio">
        <source src="../Elementos/Música ambiental _8 Ambiente espacial (No copyright)(MP3_128K).mp3"
            type="audio/mp3" />
        <p>If you are reading this, it is because your browser does not support the audio element. </p>
    </audio>

    <form method="POST" action="../variables/dificultad.php">
        <div class="switch-container">
            <input name="modo" type="hidden" value="0" />
            <input name="modo" type="checkbox" id="switch" value="1" style="display: none;"/>
            <label for="switch" class="lbl"></label>
        </div>
        <input class= "guardarModo" type="submit" value="Guardar">
    </form>

    <div class="Menu-box">
        <img class="Logo" src="../Elementos/Universe_defenders.png" alt="Logo_juego">
        <h1>M E N U</h1>
        <form method= "POST" action="../variables/iniciarJuego.php">
            <!-- <div class="col-md-6 animated infinite jello"> -->
            <div class="animated infinite bounce">
                <input type="submit" name= "juego" value="START">
                <br>
                <input type="button" value="Niveles" onclick="window.location.href='../html/Escenarios.php';">
                <br>
                <input type="submit" name= "juego" value="2 jugadores">
                <br>
                <input type="button" value="Puntación" onclick="window.location.href='../html/Puntuaciones.php';">
                <br>
                <input type="button" value="Ajustes" onclick="window.location.href='../html/Configuraciones.php';">
            </div>
        </form>
    </div>

    <div class="lasers">
        <div class="laser"></div>
        <div class="laser"></div>
        <div class="laser"></div>
        <div class="laser"></div>
        <div class="laser"></div>
        <div class="laser"></div>
        <div class="laser"></div>
        <div class="laser"></div>
        <div class="laser"></div>
        <div class="laser"></div>
        <div class="laser"></div>
        <div class="laser"></div>
    </div>








    <!-- <form class="Menu_Inicio">
      
<div class="contenedor">
 <img src="/Elementos/Universe_defendersnice.png" class="logo" alt="logo"></a>
 <div class="botones_contenedor">
<input type="button" value="START" class="button">

<br>
</div>
</div>
    </form>


    <main class="main">
        <form action="registrar.php" method="post" class="Menu">
        <div class="contenedor-inputs">
        <img src="/Elementos/Universe_defendersnice.png" class="logo" alt="logo"></a>
        <input type="button" value="START" class="Boton_Start" required>
        </div>
        </form> -->
    <!-- </main> -->

    <!-- 
    <audio controls autoplay loop>
        
        <source src="/Pantallas/Elementos/Música ambiental _8 Ambiente espacial (No copyright)(MP3_128K).mp3" type="audio/mpeg">
    </audio>
-->
</body>

</html>
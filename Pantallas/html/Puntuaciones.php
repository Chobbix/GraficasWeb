<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="shortcut icon" href="../Elementos/Universe_defenders.png" type="image/x-icon" />

    <link href="../css/Puntuaciones_style.css" rel="stylesheet" />
    <script src="https://kit.fontawesome.com/89688bb0b5.js" crossorigin="anonymous"></script>
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link href="https://fonts.googleapis.com/css2?family=DotGothic16&display=swap" rel="stylesheet" />

    <title>Puntuaciones</title>

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
        allow="autoplay" id="audio" style="display: none"></iframe>
    <audio autoplay loop id="mainAudio">
        <source src="../Elementos/Música ambiental _8 Ambiente espacial (No copyright)(MP3_128K).mp3"
            type="audio/mp3" />
        <p>
            If you are reading this, it is because your browser does not support the
            audio element.
        </p>
    </audio>

    <div class="Menu-box">
        <img class="Logo" src="../Elementos/score.png" alt="Logo_juego" />
        <form method= "GET" action="">
                <?php
                require("../../Base_de_Datos/conexion.php");

                $conex= ConectarDB();
                $res = mysqli_query($conex, "SELECT * FROM puntuaciones");
                
                while($row = $res->fetch_assoc()) {
                    ?>
                    <p>
                        <i class="fas fa-user-astronaut"></i>1. <?php echo $row['txt_nombre']; ?>.................................<?php echo $row['txt_nombre']; ?>pts
                    </p>
                    <?php
                }
                
                mysqli_close($conex);
                ?>
            <br />
            <button type="button" onclick="window.location.href='../html/Inicio.php';" class="btnhome">
                <i class="fas fa-home"></i>
            </button>
            <button type="button" onclick="window.location.href='../html/Inicio.php';" class="btn">
                <i class="fas fa-undo-alt"></i>
            </button>
            <button type="button" onclick="window.location.href='../html/Configuraciones.php';" class="btnfix">
                <i class="fas fa-cogs"></i>
            </button>
        </form>
    </div>
</body>

</html>
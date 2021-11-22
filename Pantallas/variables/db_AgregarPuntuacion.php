<?php
require("../../Base_de_Datos/conexion.php");

$conex= ConectarDB();
if ($conex){
    echo "Conexion exitosa <br><br>";
}
else {
    echo "valiste Pito";
}
mysqli_query($conex, "INSERT INTO puntuaciones txt_Nombre, puntuacion VALUES('Juan', " + $_GET['Puntaje'] +")");
mysqli_close($conex);

header('Location: ../html/Inicio.php');
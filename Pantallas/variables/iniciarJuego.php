<?php 
$Juego=$_POST['juego'];

session_start();
if($Juego=="START")
header('Location: ../html/Pantalla_Juego.php?dif='.$_SESSION['Dificultad']);
if($Juego=="2 jugadores")
header('Location: ../html/Pantalla_Juego_Multijugador.php?dif='.$_SESSION['Dificultad']);
?>
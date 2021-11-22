<?php 
$dificultad=$_POST['modo'];


session_start();
$_SESSION['Dificultad'] = $dificultad;

header('Location: ../html/Inicio.php?dif='.$dificultad);

?>
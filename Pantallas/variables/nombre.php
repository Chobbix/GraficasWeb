<?php 
$nombre=$_POST['Nickname'];

session_start();
$_SESSION['Nickname'] = $nombre;

header('Location: ../html/Inicio.php?Nickname='.$nombre);
?>
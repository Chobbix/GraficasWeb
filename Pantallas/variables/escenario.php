<?php 
$escenario=$_POST['escenario'];
session_start();
$_SESSION['Escenario'] = $escenario;

header('Location: ../html/Inicio.php?Escenario='.$escenario);
?>
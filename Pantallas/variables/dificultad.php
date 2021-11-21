<?php 
$dificultad=$_POST['modo'];
echo "$dificultad";

session_start();
$_SESSION['Dificultad'] = $dificultad;
?>
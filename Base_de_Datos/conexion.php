<?php

    function ConectarDB(){
        $servidor= "localhost";
        $usuario= "id17410525_root";
        $contrasenia= "V}6W&!nq/^L?g[K";
        $db= "id17410525_wampdb";
        $cnx= mysqli_connect($servidor, $usuario, $contrasenia, $db);

        return $cnx;
    }

?>
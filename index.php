<?php

header("../Pantallas/html/Inicio.php")

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"> </script>

    <script>

        var scene = new THREE.Scene();

        var camara = new THREE.PerspectiveCamera(
            75,
            window.innerWidth/window.innerHeight
        );

        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        var geometry = new THREE.BoxGeometry();
        var material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true});
        var cube = new THREE.Mesh(geometry, material);

        scene.add(cube);

        camara.position.z = 5;

        //var controls = new OrbitControls(camara, renderer.domElement);

        var animate = function(){
            requestAnimationFrame(animate);

            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;

            renderer.render(scene, camara);
        }

        animate();

    </script>
</body>
</html>
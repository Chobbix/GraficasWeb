// http://localhost/GW_git/GitHub/GraficasWeb/Pantallas/html/Pantalla_Juego_Multijugador.html
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';


var scene;
var renderer;
var camera;
var posCubo01 = -1;
var posCubo02 = 1;
var clock;
var deltaTime;
var keys = {};
var velocidad = 10;
var lastQ = false;
var rayCaster;
var rayCaster2;
var rayCaster3;
var rayCaster4;
var intervalo;
var ciclos_Timer = 0;
var puntuacion = 0;
var isHard = true;
var collisionObjects = [];
var collisionMeteoros = [];
var mixers=[];
var mixers2=[];
var action, action2, action3, action4;
var flag=false;
var flag2=false;
var isWorldReady = [ false, false, false, false, false];

var material2 = new THREE.MeshPhongMaterial({
    color: new THREE.Color(0.5, 0.5, 0.5),
    specular: new THREE.Color(1, 1, 1),
    shininess: 50
});
var material3 = new THREE.MeshLambertMaterial({
    color: new THREE.Color(0.7, 0.0, 0.0)
});

$(document).ready(function() {
    setupScene();
    
    var time = 5000;
    rayCaster = new THREE.Raycaster();
    rayCaster2 = new THREE.Raycaster();
    rayCaster3 = new THREE.Raycaster();
    rayCaster4 = new THREE.Raycaster();

    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshLambertMaterial({
        color: new THREE.Color(0.7, 0.0, 0.0)
    });


    const loader = new FBXLoader();
    loader.load('../Elementos/modelos/Star_Fighter/Textura/StarFighter2.fbx', (nave) => {

        nave.scale.setScalar(.2); 
        nave.rotation.y = THREE.Math.degToRad(180);
        
        const anim = new FBXLoader();
        anim.load('../Elementos/modelos/Star_Fighter/Textura/StarFighter2Anim.fbx', (anim) => {
            nave.mixer = new THREE.AnimationMixer(nave);
            mixers.push(nave.mixer);
            action = nave.mixer.clipAction(anim.animations[0]);
            action2 = nave.mixer.clipAction(anim.animations[1]);
            action.play();
            action2.play();

            nave.traverse( function ( child ) {
                if ( child.isMesh ) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            } );

            nave.front = new THREE.Vector3(0, 0, -1);
            nave.player = new Player(50, 10, 1, true);
            nave.rayos = [
                new THREE.Vector3(1, 0, 0),
                new THREE.Vector3(-1, 0, 0),
                new THREE.Vector3(0, 0, 1),
                new THREE.Vector3(0, 0, -1),
            ];
            nave.position.set(-15, 0, 0);

            scene.add(nave);

            nave.name = "cubo01";
            isWorldReady[0] = true
        });
        
    });

    const loader2 = new FBXLoader();
    loader2.load('../Elementos/modelos/Star_Fighter/Textura/StarFighter2Nav2.fbx', (nave2) => {

        nave2.scale.setScalar(.2); 
        //nave2.rotation.y = THREE.Math.degToRad(180);
        
        const anim2 = new FBXLoader();
        anim2.load('../Elementos/modelos/Star_Fighter/Textura/StarFighter2Anim.fbx', (anim) => {
            nave2.mixer = new THREE.AnimationMixer(nave2);
            mixers2.push(nave2.mixer);
            action3 = nave2.mixer.clipAction(anim.animations[0]);
            action4 = nave2.mixer.clipAction(anim.animations[1]);
            action3.play();
            action4.play();

            /*nave2.traverse( function ( child ) {
                if ( child.isMesh ) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            } );*/

            nave2.front = new THREE.Vector3(0, 0, -1);
            nave2.player = new Player(50, 10, 1, true);
            nave2.rayos = [
                new THREE.Vector3(1, 0, 0),
                new THREE.Vector3(-1, 0, 0),
                new THREE.Vector3(0, 0, 1),
                new THREE.Vector3(0, 0, -1),
            ];
            nave2.position.set(15, 0, 0);

            scene.add(nave2);

            nave2.name = "cubo02";
            isWorldReady[1] = true;
        });
        
    });
    
    /*var cubo = new THREE.Mesh(geometry, material);
    cubo.front = new THREE.Vector3(0, 0, -1);
    cubo.player = new Player(50, 10, 1, true);
    cubo.rayos = [
        new THREE.Vector3(1, 0, 0),
        new THREE.Vector3(-1, 0, 0),
        new THREE.Vector3(0, 0, 1),
        new THREE.Vector3(0, 0, -1),
    ];


    var cubo2 = new THREE.Mesh(geometry, material);
    cubo2.front = new THREE.Vector3(0, 0, -1);
    cubo2.player = new Player(50, 10, 1, true);
    cubo2.rayos = [
        new THREE.Vector3(1, 0, 0),
        new THREE.Vector3(-1, 0, 0),
        new THREE.Vector3(0, 0, 1),
        new THREE.Vector3(0, 0, -1),
    ];


    cubo.position.set(-15, 0, 0);
    cubo2.position.set(15, 0, 0);*/


    LoadFBX('../Elementos/modelos/UFO/UFO_Enemigo1i2.fbx', (enemi) => {
        enemi.scale.setScalar(1); 
        //var enemi = new THREE.Mesh(geometry, material2);
        enemi.position.set(posicionAleatoriaAncho(), 25, posicionAleatoriaLargo());

        var enemi1 = enemi.clone();
        enemi1.position.set(posicionAleatoriaAncho(), 25, posicionAleatoriaLargo());

        var enemi2 = enemi.clone();
        enemi2.position.set(posicionAleatoriaAncho(), 25, posicionAleatoriaLargo());

        var enemi3 = enemi.clone();
        enemi3.position.set(posicionAleatoriaAncho(), 25, posicionAleatoriaLargo());
        
        var enemi4 = enemi.clone();
        enemi4.position.set(posicionAleatoriaAncho(), 25, posicionAleatoriaLargo());
        
        var enemi5 = enemi.clone();
        enemi5.position.set(posicionAleatoriaAncho(), 25, posicionAleatoriaLargo());
        
        var enemi6 = enemi.clone();
        enemi6.position.set(posicionAleatoriaAncho(), 25, posicionAleatoriaLargo());
        
        var enemi7 = enemi.clone();
        enemi7.position.set(posicionAleatoriaAncho(), 25, posicionAleatoriaLargo());
        
        var enemi8 = enemi.clone();
        enemi8.position.set(posicionAleatoriaAncho(), 25, posicionAleatoriaLargo());
        
        var enemi9 = enemi.clone();
        enemi9.position.set(posicionAleatoriaAncho(), 25, posicionAleatoriaLargo());
        
        var enemi10 = enemi.clone();
        enemi10.position.set(posicionAleatoriaAncho(), 25, posicionAleatoriaLargo());

        scene.add(enemi);
        scene.add(enemi1);
        scene.add(enemi2);
        scene.add(enemi3);
        scene.add(enemi4);
        scene.add(enemi5);
        scene.add(enemi6);
        scene.add(enemi7);
        scene.add(enemi8);
        scene.add(enemi9);
        scene.add(enemi10);

        enemi.name = "enemi";
        enemi1.name = "enemi1";
        enemi2.name = "enemi2";
        enemi3.name = "enemi3";
        enemi4.name = "enemi4";
        enemi5.name = "enemi5";
        enemi6.name = "enemi6";
        enemi7.name = "enemi7";
        enemi8.name = "enemi8";
        enemi9.name = "enemi9";
        enemi10.name = "enemi10";

        var vel_enem = 5;

        enemi.enemigo = new Enemigos(50, vel_enem, false, 0, 1);
        enemi1.enemigo = new Enemigos(50, vel_enem, false, 0, 2);
        enemi2.enemigo = new Enemigos(50, vel_enem, false, 0, 1);
        enemi3.enemigo = new Enemigos(50, vel_enem, false, 0, 2);
        enemi4.enemigo = new Enemigos(50, vel_enem, false, 0, 1);
        enemi5.enemigo = new Enemigos(50, vel_enem, false, 0, 2);
        enemi6.enemigo = new Enemigos(50, vel_enem, false, 1, 1);
        enemi7.enemigo = new Enemigos(50, vel_enem, false, 1, 2);
        enemi8.enemigo = new Enemigos(50, vel_enem, false, 1, 1);
        enemi9.enemigo = new Enemigos(50, vel_enem, false, 1, 2);
        enemi10.enemigo = new Enemigos(50, vel_enem, false, 1, 1);

        collisionObjects.push(enemi);
        collisionObjects.push(enemi1);
        collisionObjects.push(enemi2);
        collisionObjects.push(enemi3);
        collisionObjects.push(enemi4);
        collisionObjects.push(enemi5);
        collisionObjects.push(enemi6);
        collisionObjects.push(enemi7);
        collisionObjects.push(enemi8);
        collisionObjects.push(enemi9);
        collisionObjects.push(enemi10);

        isWorldReady[4] = true;
    });

    var geometryItem = new THREE.BoxGeometry(1, 1, 1);
    var materialItem = new THREE.MeshLambertMaterial({
        color: new THREE.Color(0.0, 0.0, 0.4)
    });

     LoadFBX("../Elementos/modelos/Item/pillA.fbx", (item) => {
        //var item = new THREE.Mesh(geometryItem, materialItem);
            item.scale.setScalar(.5); 
            item.position.set(0, 50, 0);
            scene.add(item);
            item.name = "item";
            item.tipo = 0;
            collisionObjects.push(item);
            isWorldReady[2] = true;
    });

    if(isHard) {
        
        LoadFBX("../Elementos/modelos/Meteorito/Meteorito.fbx", (meteoroOBJ) => {

            meteoroOBJ.scale.setScalar(1.5);
            meteoroOBJ.position.set(posicionAleatoriaAncho(), 0, -18);

            var meteoro2 = meteoroOBJ.clone();
            meteoro2.position.set(posicionAleatoriaAncho(), 0, 18);

            var meteoro3 = meteoroOBJ.clone();
            meteoro3.position.set(posicionAleatoriaAncho(), 0, -18);

            var meteoro4 = meteoroOBJ.clone();
            meteoro4.position.set(posicionAleatoriaAncho(), 0, 18);

            var meteoro5 = meteoroOBJ.clone();
            meteoro5.position.set(posicionAleatoriaAncho(), 0, -18);

            scene.add(meteoroOBJ);
            scene.add(meteoro2);
            scene.add(meteoro3);
            scene.add(meteoro4);
            scene.add(meteoro5);

            meteoroOBJ.name = "meteoro1";
            meteoro2.name = "meteoro2";
            meteoro3.name = "meteoro3";
            meteoro4.name = "meteoro4";
            meteoro5.name = "meteoro5";
    
            meteoroOBJ.invertir = false;
            meteoro2.invertir = false;
            meteoro3.invertir = false;
            meteoro4.invertir = false;
            meteoro5.invertir = false;
    
            collisionMeteoros.push(meteoroOBJ);
            collisionMeteoros.push(meteoro2);
            collisionMeteoros.push(meteoro3);
            collisionMeteoros.push(meteoro4);
            collisionMeteoros.push(meteoro5);

            isWorldReady[3] = true;
        });
        /*var geometryMeteoro = new THREE.BoxGeometry(2, 2, 2);
        var materialMeteoro = new THREE.MeshLambertMaterial({
            color: new THREE.Color(0.7, 0.5, 0.0)
        });

        var meteoro1 = new THREE.Mesh(geometryMeteoro, materialMeteoro);
        meteoro1.position.set(posicionAleatoriaAncho(), 0, -18);

        var meteoro2 = meteoro1.clone();
        meteoro2.position.set(posicionAleatoriaAncho(), 0, 18);

        var meteoro3 = meteoro1.clone();
        meteoro3.position.set(posicionAleatoriaAncho(), 0, -18);

        var meteoro4 = meteoro1.clone();
        meteoro4.position.set(posicionAleatoriaAncho(), 0, 18);

        var meteoro5 = meteoro1.clone();
        meteoro5.position.set(posicionAleatoriaAncho(), 0, -18);

        scene.add(meteoro1);
        scene.add(meteoro2);
        scene.add(meteoro3);
        scene.add(meteoro4);
        scene.add(meteoro5);

        meteoro1.name = "meteoro1";
        meteoro2.name = "meteoro2";
        meteoro3.name = "meteoro3";
        meteoro4.name = "meteoro4";
        meteoro5.name = "meteoro5";

        meteoro1.invertir = false;
        meteoro2.invertir = false;
        meteoro3.invertir = false;
        meteoro4.invertir = false;
        meteoro5.invertir = false;

        collisionMeteoros.push(meteoro1);
        collisionMeteoros.push(meteoro2);
        collisionMeteoros.push(meteoro3);
        collisionMeteoros.push(meteoro4);
        collisionMeteoros.push(meteoro5);*/
    }

    $("#gameplay").append(renderer.domElement);
    render();

    if(isHard) time = 3000;

    intervalo = setInterval(cargaEnemigos, time);
    setInterval(cargaItem, 10000);
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
});

function LoadFBX(fbxFile, onLoadCallback) {
		
    const loader = new FBXLoader();
    loader.load(fbxFile, (fbx) => {
        fbx.traverse( function ( child ) {
             if ( child.isMesh ) {
                child.castShadow = true;
                 child.receiveShadow = true;
             }
        } );

        onLoadCallback(fbx);
    });
}

function onKeyDown(event) {
    lastQ = keys["Q"];
    keys[String.fromCharCode(event.keyCode)] = true;
}

function onKeyUp(event) {
    keys[String.fromCharCode(event.keyCode)] = false;
    KEYS[key]=false;
}

function render() {
    requestAnimationFrame(render);
    deltaTime = clock.getDelta();

    var left_rigth = 0;
    var up_down = 0;
    var rotate = 0;
    var shoot = false;

    var left_rigth2 = 0;
    var up_down2 = 0;
    var rotate2 = 0;
    var shoot2 = false;

    if (isWorldReady[0] & isWorldReady[1]){
    var nave = scene.getObjectByName("cubo01");
    var nave2 = scene.getObjectByName("cubo02");



    if (keys["A"] && nave.position.x > -25) left_rigth = -nave.player.velocidad;
    else if (keys["D"] && nave.position.x < -2) left_rigth = nave.player.velocidad;

    if (keys["W"] && nave.position.z > -15) up_down = -nave.player.velocidad;
    else if (keys["S"] && nave.position.z < 15) up_down = nave.player.velocidad;

    if (keys["R"]) rotate = 5;
    else if (keys["T"]) rotate = -5;

    if (keys["Y"]) shoot = true;



    if (keys["H"] && nave2.position.x > 2) left_rigth2 = -nave2.player.velocidad;
    else if (keys["K"] && nave2.position.x < 25) left_rigth2 = nave2.player.velocidad;

    if (keys["U"] && nave2.position.z > -15) up_down2 = -nave2.player.velocidad;
    else if (keys["J"] && nave2.position.z < 15) up_down2 = nave2.player.velocidad;

    if (keys["I"]) rotate2 = 5;
    else if (keys["O"]) rotate2 = -5;

    if (keys["P"]) shoot2 = true;

    if(mixers.length>0){
        for(var i=0; i<mixers.length;i++){
            mixers[i].update(deltaTime);
        }
        if(flag){
            action.weight=0;
            action2.weight=1;

            flag=false;
        }else{
            action.weight=1;
            action2.weight=0;
        }
    }

    if(mixers2.length>0){
        for(var i=0; i<mixers2.length;i++){
            mixers2[i].update(deltaTime);
        }
        if(flag2){
            action3.weight=0;
            action4.weight=1;

            flag2=false;
        }else{
            action3.weight=1;
            action4.weight=0;
        }
    }


    nave.position.x += left_rigth * deltaTime;
    nave.position.z += up_down * deltaTime;
    nave.rotation.y += rotate * deltaTime;
    var axis = new THREE.Vector3( 0, 1, 0 );
    nave.front.applyAxisAngle(axis, rotate * deltaTime);
    nave.front.material = material2;


    nave2.position.x += left_rigth2 * deltaTime;
    nave2.position.z += up_down2 * deltaTime;
    nave2.rotation.y += rotate2 * deltaTime;
    var axis2 = new THREE.Vector3( 0, 1, 0 );
    nave2.front.applyAxisAngle(axis2, rotate2 * deltaTime);
    nave2.front.material = material2;


    if(isWorldReady[1] && isWorldReady[2] && isWorldReady[3]){
    for(var i = 0; i < nave.rayos.length; i++) {
        rayCaster2.set(nave.position, nave.rayos[i]);

        var collision = rayCaster2.intersectObjects(collisionObjects, true);
        if (collision.length > 0 && collision[0].distance < 1) {
            var obj = collision[0].object;
            obj.position.set(posicionAleatoriaAncho(), 50, posicionAleatoriaLargo());

            if (obj.name != "item") {
                obj.enemigo.vida = 50;
                nave.player.vida -= 20;
            }
            else {
                if (obj.tipo == 1){ nave.player.vida = 50; }
                if (obj.tipo == 2){ nave.player.aumentarVelocidad(3); }
                if (obj.tipo == 3){ nave.player.aumentarPoder(5); }
                console.log(nave.player);
            }
        }

        if(isHard) {
            collision = rayCaster2.intersectObjects(collisionMeteoros, true);
            if (collision.length > 0 && collision[0].distance < 1) {
                nave.player.vida -= 50;
            }
        }
    }

    
    if(shoot){
        flag=true;
        rayCaster.set(nave.position, nave.front);
        var collision = rayCaster.intersectObjects(collisionObjects, true);				
        
        if (collision.length > 0 && collision[0].object.name != "item") {
            console.log("colisionando");
            console.log(collision[0].distance);
            var obj = collision[0].object;

            obj.enemigo.recibirDaño(nave.player.hacerDaño());
            obj.enemigo.player = 2;
            obj.material = material3;
            console.log(obj.enemigo.vida);            

            if (obj.enemigo.vida <= 0){
                obj.position.set(posicionAleatoriaAncho(), 50, posicionAleatoriaLargo());
                obj.enemigo.vida = 50;
                puntuacion ++;
            }
        }
    }
    else {
        for(var i = 0; i < collisionObjects.length; i++) {
            if(collisionObjects[i].name != "item"){
                collisionObjects[i].material = material2;
            }
        }
    }



    for(var i = 0; i < nave2.rayos.length; i++) {
        rayCaster3.set(nave2.position, nave2.rayos[i]);

        var collision = rayCaster3.intersectObjects(collisionObjects, true);
        if (collision.length > 0 && collision[0].distance < 1) {
            var obj = collision[0].object;
            obj.position.set(posicionAleatoriaAncho(), 50, posicionAleatoriaLargo());

            if (obj.name != "item") {
                obj.enemigo.vida = 50;
                nave2.player.vida -= 20;
            }
            else {
                if (obj.tipo == 1){ nave2.player.vida = 50; }
                if (obj.tipo == 2){ nave2.player.aumentarVelocidad(3); }
                if (obj.tipo == 3){ nave2.player.aumentarPoder(5); }
                console.log(nave2.player);
            }
        }

        if(isHard) {
            collision = rayCaster3.intersectObjects(collisionMeteoros, true);
            if (collision.length > 0 && collision[0].distance < 1) {
                nave2.player.vida -= 50;
            }
        }
    }

    
    if(shoot2){
        flag2=true;
        rayCaster4.set(nave2.position, nave2.front);
        var collision = rayCaster4.intersectObjects(collisionObjects, true);				
        
        if (collision.length > 0 && collision[0].object.name != "item") {
            console.log("colisionando");
            console.log(collision[0].distance);
            var obj = collision[0].object;

            obj.enemigo.recibirDaño(nave2.player.hacerDaño());
            obj.enemigo.player = 1;
            obj.material = material3;
            console.log(obj.enemigo.vida);            

            if (obj.enemigo.vida <= 0){
                obj.position.set(posicionAleatoriaAncho(), 50, posicionAleatoriaLargo());
                obj.enemigo.vida = 50;
                puntuacion ++;
            }
        }
    }
    else {
        for(var i = 0; i < collisionObjects.length; i++) {
            if(collisionObjects[i].name != "item"){
                collisionObjects[i].material = material2;
            }
        }
    }

    for(var i = 0; i < collisionObjects.length; i++) {
        if(collisionObjects[i].name != "item"){
            if(collisionObjects[i].enemigo.isReady == true) {
                if(collisionObjects[i].enemigo.player == 1) collisionObjects[i].lookAt(nave.position);
                if(collisionObjects[i].enemigo.player == 2) collisionObjects[i].lookAt(nave2.position);

                if(i < collisionObjects.length/2)
                    collisionObjects[i].translateX(collisionObjects[i].enemigo.velocidad* deltaTime);
                collisionObjects[i].translateZ(collisionObjects[i].enemigo.velocidad * deltaTime);
            }
        }
    }
    }



    if(isHard) {
        if(isWorldReady[3]){
        var meteoro1 = scene.getObjectByName("meteoro1");
        var meteoro2 = scene.getObjectByName("meteoro2");
        var meteoro3 = scene.getObjectByName("meteoro3");
        var meteoro4 = scene.getObjectByName("meteoro4");
        var meteoro5 = scene.getObjectByName("meteoro5");
        
        if(!meteoro1.invertir) meteoro1.position.z += 2 * deltaTime;
        if(!meteoro2.invertir) meteoro2.position.z -= 3 * deltaTime;
        if(!meteoro3.invertir) meteoro3.position.z += 4 * deltaTime;
        if(!meteoro4.invertir) meteoro4.position.z -= 5 * deltaTime;
        if(!meteoro5.invertir) meteoro5.position.z += 6 * deltaTime;

        if(meteoro1.invertir) meteoro1.position.z -= 2 * deltaTime;
        if(meteoro2.invertir) meteoro2.position.z += 3 * deltaTime;
        if(meteoro3.invertir) meteoro3.position.z -= 4 * deltaTime;
        if(meteoro4.invertir) meteoro4.position.z += 5 * deltaTime;
        if(meteoro5.invertir) meteoro5.position.z -= 6 * deltaTime;

        if(meteoro1.position.z > 18)  {meteoro1.invertir = true; meteoro1.position.x = posicionAleatoriaLargo();}
        if(meteoro2.position.z < -18) {meteoro2.invertir = true; meteoro2.position.x = posicionAleatoriaLargo();}
        if(meteoro3.position.z > 18)  {meteoro3.invertir = true; meteoro3.position.x = posicionAleatoriaLargo();}
        if(meteoro4.position.z < -18) {meteoro4.invertir = true; meteoro4.position.x = posicionAleatoriaLargo();}
        if(meteoro5.position.z > 18)  {meteoro5.invertir = true; meteoro5.position.x = posicionAleatoriaLargo();}

        if(meteoro1.position.z < -18) {meteoro1.invertir = false; meteoro1.position.x = posicionAleatoriaLargo();}
        if(meteoro2.position.z > 18)  {meteoro2.invertir = false; meteoro2.position.x = posicionAleatoriaLargo();}
        if(meteoro3.position.z < -18) {meteoro3.invertir = false; meteoro3.position.x = posicionAleatoriaLargo();}
        if(meteoro4.position.z > 18)  {meteoro4.invertir = false; meteoro4.position.x = posicionAleatoriaLargo();}
        if(meteoro5.position.z < -18) {meteoro5.invertir = false; meteoro5.position.x = posicionAleatoriaLargo();}
        }
    }
}

    renderer.render(scene, camera);
}


function setupScene() {		
    var visibleSize = { width: window.innerWidth, height: 720};
    clock = new THREE.Clock();		
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, visibleSize.width / visibleSize.height, 0.1, 100);

    camera.position.z = 0;
    camera.position.x = 0;
    camera.position.y = 20;

    camera.rotation.x = THREE.Math.degToRad(270);

    renderer = new THREE.WebGLRenderer( {precision: "mediump" } );
    renderer.setClearColor(new THREE.Color(0, 0, 0));
    renderer.setPixelRatio(visibleSize.width / visibleSize.height);
    renderer.setSize(visibleSize.width, visibleSize.height);

    var ambientLight = new THREE.AmbientLight(new THREE.Color(1, 1, 1), 1.0);
    scene.add(ambientLight);

    var directionalLight = new THREE.DirectionalLight(new THREE.Color(1, 1, 0), 0.4);
    directionalLight.position.set(0, 0, 1);
    scene.add(directionalLight);

    var grid = new THREE.GridHelper(50, 10, 0xffffff, 0xffffff);
    grid.position.y = -1;
    scene.add(grid);

    $("#gameplay").append(renderer.domElement);
}

function posicionAleatoriaAncho(){
    return Math.floor((Math.random() * (25-(-25)))) + (-25);
}

function posicionAleatoriaLargo(){
    return Math.floor((Math.random() * (13-(-13)))) + (-13);
}

function itemAleatorio(){
    return Math.floor((Math.random() * (4-1))) + 1;
}

function cargaEnemigos() {
    if(isWorldReady[4]){
    if (ciclos_Timer < collisionObjects.length) {
        if(collisionObjects[ciclos_Timer].name != "item"){
            collisionObjects[ciclos_Timer].enemigo.isReady = true;
        }
        ciclos_Timer ++;
    }
    else {
        clearInterval(intervalo);
    }
    }
}

function cargaItem () {
    var item = scene.getObjectByName("item");
    item.tipo = itemAleatorio();
    item.position.set(posicionAleatoriaAncho(), 0, posicionAleatoriaLargo());
    console.log(item.position);
}
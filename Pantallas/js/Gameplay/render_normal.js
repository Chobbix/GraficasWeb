//http://localhost/GW_git/GitHub/GraficasWeb/Pantallas/html/Pantalla_Juego.html
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
var intervalo;
var ciclos_Timer = 0;
var puntuacion = 0;
var isHard = true;
var collisionObjects = [];
var collisionMeteoros = [];
var mixers=[];
var action, action2;
var flag=false;
var isWorldReady = [ false, false, false, false];
var pause = false;

var material2 = new THREE.MeshPhongMaterial({
    color: new THREE.Color(0.5, 0.5, 0.5),
    specular: new THREE.Color(1, 1, 1),
    shininess: 50
});
var material3 = new THREE.MeshLambertMaterial({
    color: new THREE.Color(0.7, 0.0, 0.0)
});

$(document).ready(function() {
    var dif = getParameterByName('dif');
    if(dif == 2) {
        isHard = true;
    }
    setupScene();
    
    var time = 5000;
    rayCaster = new THREE.Raycaster();
    rayCaster2 = new THREE.Raycaster();

    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshLambertMaterial({
        color: new THREE.Color(0.7, 0.0, 0.0)
    });

    /*-------------------------------------NAVE MODELO-----------------------------------------------*/ 
    LoadFBXAnimetedNave('../Elementos/modelos/Star_Fighter/Textura/StarFighter2.fbx', (objetoCargado) => {
        objetoCargado.scale.setScalar(.2); 
        objetoCargado.front = new THREE.Vector3(0, 0, -1);
        objetoCargado.player = new Player(50, 10, 1, true);
        objetoCargado.rayos = [
            new THREE.Vector3(1, 0, 0),
            new THREE.Vector3(-1, 0, 0),
            new THREE.Vector3(0, 0, 1),
            new THREE.Vector3(0, 0, -1),
        ];		
        scene.add(objetoCargado);

        objetoCargado.name = "cubo01";
        isWorldReady[0] = true
    });

    var vel_enem = 5;
    if(isHard) vel_enem = 9;

    /*-------------------------------------ENEMIGO MODELO-----------------------------------------------*/ 
    LoadFBX('../Elementos/modelos/UFO/UFO_Enemigo1i2.fbx', (enemi) => {
        enemi.scale.setScalar(1); 
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
    
        enemi.enemigo = new Enemigos(50, vel_enem, false, 0);
        enemi1.enemigo = new Enemigos(50, vel_enem, false, 0);
        enemi2.enemigo = new Enemigos(50, vel_enem, false, 0);
        enemi3.enemigo = new Enemigos(50, vel_enem, false, 0);
        enemi4.enemigo = new Enemigos(50, vel_enem, false, 0);
        enemi5.enemigo = new Enemigos(50, vel_enem, false, 0);
        enemi6.enemigo = new Enemigos(50, vel_enem, false, 1);
        enemi7.enemigo = new Enemigos(50, vel_enem, false, 1);
        enemi8.enemigo = new Enemigos(50, vel_enem, false, 1);
        enemi9.enemigo = new Enemigos(50, vel_enem, false, 1);
        enemi10.enemigo = new Enemigos(50, vel_enem, false, 1);
    
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

        isWorldReady[1] = true;
    });

    /*-------------------------------------ITEM MODELO-----------------------------------------------*/ 
    var geometryItem = new THREE.SphereGeometry(15, 32, 16);
    var materialItem = new THREE.MeshLambertMaterial({
        color: new THREE.Color(0.0, 0.0, 0.4)
    });
    var item = new THREE.Mesh(geometryItem, materialItem);
    item.position.set(0, 50, 0);
    item.scale.setScalar(.1); 
    scene.add(item);
    item.name = "item";
    item.tipo = 0;
    collisionObjects.push(item);
    isWorldReady[2] = true;
    /*-------------------------------------ITEM MODELO-----------------------------------------------*/ 

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
    }

    $("#gameplay").append(renderer.domElement);
    render();

    if(isHard) time = 3000;

    intervalo = setInterval(cargaEnemigos, time);
    setInterval(cargaItem, 10000);
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
});

function LoadFBXAnimetedNave(fbxFile, onLoadCallback){
    const loader = new FBXLoader();
    loader.load(fbxFile, (object) => {

    object.rotation.y = THREE.Math.degToRad(-90);
        const anim = new FBXLoader();
            anim.load('../Elementos/modelos/Star_Fighter/Textura/StarFighter2Anim.fbx', (anim) => {
            object.mixer = new THREE.AnimationMixer(object);
            mixers.push(object.mixer);
            action = object.mixer.clipAction(anim.animations[0]);
            action2 = object.mixer.clipAction(anim.animations[1]);
            action.play();
            action2.play();

            object.traverse( function ( child ) {
                if ( child.isMesh ) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            } );

            onLoadCallback(object);
            });
    
});
}

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
}

function render() {

    if (keys["B"]) pause = true;
    if (keys["N"]) pause = false;

    requestAnimationFrame(render);

    if(pause == true) { deltaTime = 0; }
    else { deltaTime = clock.getDelta(); }

    var left_rigth = 0;
    var up_down = 0;
    var rotate = 0;
    var shoot = false;

    if (isWorldReady[0] && isWorldReady[1] && isWorldReady[2]){
    var nave = scene.getObjectByName("cubo01");
    var enemigo = scene.getObjectByName("enemi");
    var enemigo1 = scene.getObjectByName("enemi1");
    var enemigo2 = scene.getObjectByName("enemi2");
    var enemigo3 = scene.getObjectByName("enemi3");
    var enemigo4 = scene.getObjectByName("enemi4");
    var enemigo5 = scene.getObjectByName("enemi5");
    var enemigo6 = scene.getObjectByName("enemi6");
    var enemigo7 = scene.getObjectByName("enemi7");
    var enemigo8 = scene.getObjectByName("enemi8");
    var enemigo9 = scene.getObjectByName("enemi9");
    var enemigo10 = scene.getObjectByName("enemi10");

    isFinished(nave);

    var item = scene.getObjectByName("item");
    item.object;

    if (keys["A"] && nave.position.x > -25) left_rigth = -nave.player.velocidad;
    else if (keys["D"] && nave.position.x < 25) left_rigth = nave.player.velocidad;

    if (keys["W"] && nave.position.z > -15) up_down = -nave.player.velocidad;
    else if (keys["S"] && nave.position.z < 15) up_down = nave.player.velocidad;

    if (keys["R"]) rotate = 5;
    else if (keys["T"]) rotate = -5;

    if (keys["Y"]) shoot = true;

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

    nave.position.x += left_rigth * deltaTime;
    nave.position.z += up_down * deltaTime;
    nave.rotation.y += rotate * deltaTime;
    var axis = new THREE.Vector3( 0, 1, 0 );
    nave.front.applyAxisAngle(axis, rotate * deltaTime);
    nave.front.material = material2;

    if(isWorldReady[1] && isWorldReady[2]){
    for(var i = 0; i < nave.rayos.length; i++) {
        
        rayCaster2.set(nave.position, nave.rayos[i]);

        var collision = rayCaster2.intersectObjects(collisionObjects, true);
        if (collision.length > 0 && collision[0].distance < 1) {
            var obj = collision[0].object;
            

            if (obj.name != "item") {
                obj.parent.parent.parent.position.set(posicionAleatoriaAncho(), 50, posicionAleatoriaLargo());
                obj.parent.parent.parent.enemigo.vida = 50;
                nave.player.vida -= 20;
            }
            else {
                obj.position.set(posicionAleatoriaAncho(), 50, posicionAleatoriaLargo());
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

            obj.parent.parent.parent.enemigo.recibirDaño(nave.player.hacerDaño());
            obj.material = material3;

            if (obj.parent.parent.parent.enemigo.vida <= 0){
                obj.parent.parent.parent.position.set(posicionAleatoriaAncho(), 50, posicionAleatoriaLargo());
                obj.parent.parent.parent.enemigo.vida = 50;
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
                collisionObjects[i].lookAt(nave.position);

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
    var visibleSize = { width: window.innerWidth, height: window.innerHeight};
    clock = new THREE.Clock();		
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, visibleSize.width / visibleSize.height, 0.1, 100);

    camera.position.z = 0;
    camera.position.x = 0;
    camera.position.y = 20;

    camera.rotation.x = THREE.Math.degToRad(270);

    renderer = new THREE.WebGLRenderer( {precision: "mediump", alpha: true } );
    renderer.setClearColor(new THREE.Color(0, 0, 0),0);
    renderer.setPixelRatio(visibleSize.width / visibleSize.height);
    renderer.setSize(visibleSize.width, visibleSize.height);

    var ambientLight = new THREE.AmbientLight(new THREE.Color(1, 1, 1), 1.0);
    scene.add(ambientLight);

    var directionalLight = new THREE.DirectionalLight(new THREE.Color(1, 1, 0), 0.4);
    directionalLight.position.set(0, 0, 1);
    scene.add(directionalLight);

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
    if(isWorldReady[1]){
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

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function isFinished(nave) {
    if(nave.player.vida <= 0) nave.player.isAlive = false;
    if(nave.player.isAlive == false) $(location).attr('href','../html/Victoria.php?Puntaje=' + puntuacion);
}
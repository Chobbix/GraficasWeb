
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
var intervalo;
var ciclos_Timer = 0;
var puntuacion = 0;
var isHard = false;
var collisionObjects = [];
var material3 = new THREE.MeshLambertMaterial({
    color: new THREE.Color(0.7, 0.0, 0.0)
});

$(document).ready(function() {
    setupScene();
    
    var time = 5000;
    rayCaster = new THREE.Raycaster();

    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshLambertMaterial({
        color: new THREE.Color(0.7, 0.0, 0.0)
    });

    material2 = new THREE.MeshPhongMaterial({
        color: new THREE.Color(0.5, 0.5, 0.5),
        specular: new THREE.Color(1, 1, 1),
        shininess: 50
    });

    var cubo = new THREE.Mesh(geometry, material);
    cubo.front = new THREE.Vector3(0, 0, -1);
    cubo.player = new Player(50, 10, 1, true);

    var enemi = new THREE.Mesh(geometry, material2);
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

    scene.add(cubo);
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

    cubo.name = "cubo01";
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
    if(isHard) vel_enem = 9;

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

    if(isHard) {
        var geometryMeteoro = new THREE.BoxGeometry(2, 2, 2);
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
    }

    $("#gameplay").append(renderer.domElement);
    render();

    if(isHard) time = 3000;

    intervalo = setInterval(cargaEnemigos, time);
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
});

function onKeyDown(event) {
    lastQ = keys["Q"];
    keys[String.fromCharCode(event.keyCode)] = true;
}

function onKeyUp(event) {
    keys[String.fromCharCode(event.keyCode)] = false;
}

function render() {
    requestAnimationFrame(render);
    deltaTime = clock.getDelta();

    var left_rigth = 0;
    var up_down = 0;
    var rotate = 0;
    var shoot = false;

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

    if (keys["A"] && nave.position.x > -25) left_rigth = -nave.player.velocidad;
    else if (keys["D"] && nave.position.x < 25) left_rigth = nave.player.velocidad;

    if (keys["W"] && nave.position.z > -15) up_down = -nave.player.velocidad;
    else if (keys["S"] && nave.position.z < 15) up_down = nave.player.velocidad;

    if (keys["R"]) rotate = 5;
    else if (keys["T"]) rotate = -5;

    if (keys["Y"]) shoot = true;

    nave.position.x += left_rigth * deltaTime;
    nave.position.z += up_down * deltaTime;
    nave.rotation.y += rotate * deltaTime;
    var axis = new THREE.Vector3( 0, 1, 0 );
    nave.front.applyAxisAngle(axis, rotate * deltaTime);
    nave.front.material = material2;
    
    if(shoot){
        rayCaster.set(nave.position, nave.front);
        var collision = rayCaster.intersectObjects(collisionObjects, true);				
        
        if (collision.length > 0) {
            console.log("colisionando");
            console.log(collision[0].distance);
            var obj = collision[0].object;

            obj.enemigo.recibirDaño(nave.player.hacerDaño());
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
            collisionObjects[i].material = material2;
        }
    }

    for(var i = 0; i < collisionObjects.length; i++) {
        if(collisionObjects[i].enemigo.isReady == true) {
            collisionObjects[i].lookAt(nave.position);

            if(i < collisionObjects.length/2)
                collisionObjects[i].translateX(collisionObjects[i].enemigo.velocidad* deltaTime);
            collisionObjects[i].translateZ(collisionObjects[i].enemigo.velocidad * deltaTime);
        }
    }

    if(isHard) {
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

function velocidadAleatoria(){
    return Math.floor((Math.random() * (5-1))) + 1;
}

function cargaEnemigos() {
    if (ciclos_Timer < collisionObjects.length) {
        collisionObjects[ciclos_Timer].enemigo.isReady = true;
        ciclos_Timer ++;
    }
    else {
        clearInterval(intervalo);
    }
}
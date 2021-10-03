
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
var collisionObjects = [];
var material3 = new THREE.MeshLambertMaterial({
    color: new THREE.Color(0.7, 0.0, 0.0)
});

$(document).ready(function() {
    setupScene();

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

    enemi.enemigo = new Enemigos(50, 5, false, 0);
    enemi1.enemigo = new Enemigos(50, 5, false, 0);
    enemi2.enemigo = new Enemigos(50, 5, false, 0);
    enemi3.enemigo = new Enemigos(50, 5, false, 0);
    enemi4.enemigo = new Enemigos(50, 5, false, 0);
    enemi5.enemigo = new Enemigos(50, 5, false, 0);
    enemi6.enemigo = new Enemigos(50, 5, false, 1);
    enemi7.enemigo = new Enemigos(50, 5, false, 1);
    enemi8.enemigo = new Enemigos(50, 5, false, 1);
    enemi9.enemigo = new Enemigos(50, 5, false, 1);
    enemi10.enemigo = new Enemigos(50, 5, false, 1);

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

    $("#gameplay").append(renderer.domElement);
    render();

    intervalo = setInterval(cargaEnemigos, 5000);
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

function cargaEnemigos() {
    if (ciclos_Timer < collisionObjects.length) {
        collisionObjects[ciclos_Timer].enemigo.isReady = true;
        ciclos_Timer ++;
    }
    else {
        clearInterval(intervalo);
    }
}
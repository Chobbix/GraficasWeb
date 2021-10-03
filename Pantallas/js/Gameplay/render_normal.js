
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

    var cubo2 = new THREE.Mesh(geometry, material2);
    cubo2.enemigo = new Enemigos(50, 5, true);
    cubo2.position.set(posicionAleatoria(), 0, -13);

    scene.add(cubo);
    scene.add(cubo2);

    collisionObjects.push(cubo2);

    cubo.name = "cubo01";
    cubo2.name = "cubo02";

    $("#gameplay").append(renderer.domElement);
    render();

    setInterval(cargaEnemigos, 1000);
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
    var enemigo = scene.getObjectByName("cubo02");

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

    console.log(nave.front);
    
    if(shoot){
        rayCaster.set(nave.position, nave.front);
        var collision = rayCaster.intersectObjects(collisionObjects, true);				
        
        if (collision.length > 0) {
            console.log("colisionando");
            console.log(collision[0].distance);
            var obj = collision[0].object;
            enemigo.enemigo.recibirDaño(nave.player.hacerDaño());
            enemigo.material = material3;
            console.log(enemigo.enemigo.vida);
            

            if (enemigo.enemigo.vida <= 0){
                obj.position.set(0, 0, 50);
            }
        }
    }
    else {
        enemigo.material = material2;
    }



    //enemigo.position.z += velocidad * deltaTime

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

function posicionAleatoria(){
    return Math.floor((Math.random() * (25-(-25)))) + (-25);
}

function cargaEnemigos() {
    const d = new Date();
    document.getElementById("demo").innerHTML = d.toLocaleTimeString();
}
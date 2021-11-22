<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="shortcut icon" href="../Elementos/Universe_defenders.png" type="image/x-icon">

  <script type="text/javascript" src="../js/jquery-2.1.4.min.js"></script>
  <!--<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>-->

  <link href="../css/Pantalla_Juego_style.css" rel="stylesheet">
  <script src="https://kit.fontawesome.com/89688bb0b5.js" crossorigin="anonymous"></script>
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=DotGothic16&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Tourney:wdth,wght@97.2,494&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Dhurjati&family=DotGothic16&display=swap" rel="stylesheet">
  <script src="../js/Gameplay/Player_Class.js"></script>
  <script src="../js/Gameplay/Enemigo_Class.js"></script>
  <script src="../js/Gameplay/render_multijugador.js" type="module"></script>


  <title>Pantalla Juego</title>



  <script type="text/javascript">
    $(document).ready(function() {

      var dificultad = localStorage.getItem("Dificultad");
      var nombre = localStorage.getItem("Nombre");
      var escenario = localStorage.getItem("Escenario");

    });
  </script>

</head>

<body>


  <iframe src="../Elementos/Música ambiental _8 Ambiente espacial (No copyright)(MP3_128K).mp3" type="audio/mp3" allow="autoplay" id="audio" style="display:none"></iframe>
  <audio autoplay loop id="mainAudio">
    <source src="../Elementos/Música ambiental _8 Ambiente espacial (No copyright)(MP3_128K).mp3" type="audio/mp3" />
    <p>If you are reading this, it is because your browser does not support the audio element. </p>
  </audio>

  <div class="botones-box" style="z-index: 1;position: absolute; position: absolute;">
    <form>
      <button type="button" onclick="window.location.href='../html/Inicio.php';" class="btnhome"><i class="fas fa-home"></i></button>
    </form>
    
    <input type="Number" class="Score" id="vid1" value="" disabled style="width: 100px;">
    <input type="Number" class="Score" id="vid2" value="" disabled style="width: 100px;">
  </div>

  <div id="gameplay" style="position: absolute;">

  </div>


  <script src="../js/three.min.js"></script>
  <script src="../js/postprocessing.min.js"></script>

  <script>
    <?php
      session_start();
      if($_SESSION['Escenario']==1){?>
        var escenario = 1;
    <?php  }else if($_SESSION['Escenario']==2){?>
        var escenario = 2;
    <?php  }else if($_SESSION['Escenario']==3){?>
        var escenario = 3;
    <?php  }
    ?>
    var scene, sceneLight, portalLight, camera, cam, renderer, clock, portalParticles = [],
      smokeParticles = [],
      renderer, cloudParticles = [],
      composer;
      

    function init() {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
      camera.position.z = 1;
      camera.rotation.x = 1.16;
      camera.rotation.y = -0.12;
      camera.rotation.z = 0.27;
      let ambient = new THREE.AmbientLight(0x555555);
      scene.add(ambient);

      let directionalLight = new THREE.DirectionalLight(0xff8c19);
      directionalLight.position.set(0, 0, 1);
      scene.add(directionalLight);

      let orangeLight = new THREE.PointLight(0xcc6600, 50, 450, 1.7);
      orangeLight.position.set(200, 300, 100);
      scene.add(orangeLight);

      let redLight = new THREE.PointLight(0xd8547e, 50, 450, 1.7);
      redLight.position.set(100, 300, 100);
      scene.add(redLight);

      let blueLight = new THREE.PointLight(0x3677ac, 50, 450, 1.7);
      blueLight.position.set(300, 300, 200);
      scene.add(blueLight);

      renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      scene.fog = new THREE.FogExp2(0x03544e, 0.001);
      renderer.setClearColor(scene.fog.color);
      document.body.appendChild(renderer.domElement);

      let loader = new THREE.TextureLoader();
      loader.load("smoke-1.png", function(texture) {
        cloudGeo = new THREE.PlaneBufferGeometry(500, 500);
        cloudMaterial = new THREE.MeshLambertMaterial({
          map: texture,
          transparent: true
        });
        for (let p = 0; p < 50; p++) {
          let cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
          cloud.position.set(
            Math.random() * 800 - 400,
            500,
            Math.random() * 500 - 500
          );
          cloud.rotation.x = 1.16;
          cloud.rotation.y = -0.12;
          cloud.rotation.z = Math.random() * 2 * Math.PI;
          cloud.material.opacity = 0.55;
          cloudParticles.push(cloud);
          scene.add(cloud);
        }
      });

      loader.load("stars.jpg", function(texture) {

        const textureEffect = new POSTPROCESSING.TextureEffect({
          blendFunction: POSTPROCESSING.BlendFunction.COLOR_DODGE,
          texture: texture
        });
        textureEffect.blendMode.opacity.value = 0.2;

        const bloomEffect = new POSTPROCESSING.BloomEffect({
          blendFunction: POSTPROCESSING.BlendFunction.COLOR_DODGE,
          kernelSize: POSTPROCESSING.KernelSize.SMALL,
          useLuminanceFilter: true,
          luminanceThreshold: 0.3,
          luminanceSmoothing: 0.75
        });
        bloomEffect.blendMode.opacity.value = 1.5;

        let effectPass = new POSTPROCESSING.EffectPass(
          camera,
          bloomEffect,
          textureEffect
        );
        effectPass.renderToScreen = true;

        composer = new POSTPROCESSING.EffectComposer(renderer);
        composer.addPass(new POSTPROCESSING.RenderPass(scene, camera));
        composer.addPass(effectPass);
        window.addEventListener("resize", onWindowResize, false);
        render();
      });
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function render() {
      cloudParticles.forEach(p => {
        p.rotation.z -= 0.001;
      });
      composer.render(0.1);
      requestAnimationFrame(render);
    }


    function initScene() {
      scene = new THREE.Scene();
      sceneLight = new THREE.DirectionalLight(0xffffff, 0.5);
      sceneLight.position.set(0, 0, 1);
      scene.add(sceneLight);
      portalLight = new THREE.PointLight(0x062d89, 30, 600, 1.7);
      portalLight.position.set(0, 0, 250);
      scene.add(portalLight);
      camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 10000);
      camera.position.z = 1000;
      scene.add(camera);
      renderer = new THREE.WebGLRenderer();
      renderer.setClearColor(0x000000, 1);
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);
      particleSetup();
    }

    function particleSetup() {
      let loader = new THREE.TextureLoader();
      loader.load("smoke.png", function(texture) {
        portalGeo = new THREE.PlaneBufferGeometry(350, 350);
        portalMaterial = new THREE.MeshStandardMaterial({
          map: texture,
          transparent: true
        });
        smokeGeo = new THREE.PlaneBufferGeometry(1000, 1000);
        smokeMaterial = new THREE.MeshStandardMaterial({
          map: texture,
          transparent: true
        });
        for (let p = 880; p > 250; p--) {
          let particle = new THREE.Mesh(portalGeo, portalMaterial);
          particle.position.set(
            0.5 * p * Math.cos((4 * p * Math.PI) / 180),
            0.5 * p * Math.sin((4 * p * Math.PI) / 180),
            0.1 * p
          );
          particle.rotation.z = Math.random() * 360;
          portalParticles.push(particle);
          scene.add(particle);
        }
        for (let p = 0; p < 40; p++) {
          let particle = new THREE.Mesh(smokeGeo, smokeMaterial);
          particle.position.set(
            Math.random() * 1000 - 500,
            Math.random() * 400 - 200,
            25
          );
          particle.rotation.z = Math.random() * 360;
          particle.material.opacity = 0.6;
          portalParticles.push(particle);
          scene.add(particle);
        }
        clock = new THREE.Clock();
        animate();

      });
    }

    function animate() {
      let delta = clock.getDelta();
      portalParticles.forEach(p => {
        p.rotation.z -= delta * 1.5;
      });
      smokeParticles.forEach(p => {
        p.rotation.z -= delta * 0.2;
      });
      if (Math.random() > 0.9) {
        portalLight.power = 350 + Math.random() * 500;
      }
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }


    function initStar() {
      //create scene object
      scene = new THREE.Scene();

      //setup camera with facing upward
      camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        1,
        1000
      );
      camera.position.z = 1;
      camera.rotation.x = Math.PI / 2;

      //setup renderer
      renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);

      starGeo = new THREE.Geometry();
      for (let i = 0; i < 6000; i++) {
        let star = new THREE.Vector3(
          Math.random() * 600 - 300,
          Math.random() * 600 - 300,
          Math.random() * 600 - 300
        );
        starGeo.vertices.push(star);
        star.velocity = 0;
        star.acceleration = 0.02;
      }

      let sprite = new THREE.TextureLoader().load("star.png");
      let starMaterial = new THREE.PointsMaterial({
        color: 0xaaaaaa,
        size: 0.7,
        map: sprite,
      });
      stars = new THREE.Points(starGeo, starMaterial);
      scene.add(stars);
      animateStar();
    }

    function animateStar() {
      starGeo.vertices.forEach((p) => {
        p.velocity += p.acceleration;
        p.y -= p.velocity;

        if (p.y < -200) {
          p.y = 200;
          p.velocity = 0;
        }
      });
      starGeo.verticesNeedUpdate = true;
      stars.rotation.y += 0.002;
      renderer.render(scene, camera);
      requestAnimationFrame(animateStar);
    }


    //FONDO NEBULOSA------------------------------------------------------------------------
    if (escenario == 3) {
      init();
    }

    // VORTICE FONDO----------------------------------------------
    if (escenario == 2) {
      initScene();
    }

    //ESTRELLAS FONDO------------------------------------------------------------
    if (escenario == 1) {
      initStar();
    }
  </script>


</body>

</html>
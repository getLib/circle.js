	// VARIABLES //
	var canvas, camera, scene, renderer, controls, raycaster, mouse, material;
	var gallerie3dCanvas, canvasWidth, canvasHeight, rayon, maxWidth, bgcolor, ratio;
	var target = 0;
	var fogFactor = 0.0015;
	var timeOutFunctionId;


	// DEPENDANCES //
	import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
	import { OrbitControls } from 'https://threejs.org/examples/jsm/controls/OrbitControls.js';

	init();
	animate();


	function init(){

		gallerie3dCanvas = document.querySelector("#circle3dCanvas");
		canvasWidth = gallerie3dCanvas.clientWidth;
		canvasHeight = gallerie3dCanvas.clientHeight;
		ratio = canvasWidth/canvasHeight;
		if(ratio>=1) rayon = canvasWidth/2;
		else rayon = canvasWidth;

		maxWidth= canvasHeight/4;
		bgcolor = gallerie3dCanvas.getAttribute("data-background");

		/* SCENE */
		scene = new THREE.Scene();
		scene.background = new THREE.Color(bgcolor);
		scene.fog = new THREE.FogExp2(bgcolor, fogFactor );

		/* RAYCASTER */
		raycaster = new THREE.Raycaster();
  		mouse = new THREE.Vector2()

		/* IMAGE */
		const gallerie = document.querySelectorAll("#circle3dImg img");

		for (var i = 0; i < gallerie.length; i++) {
			var planeWidth = (maxWidth/gallerie[i].getAttribute("data-width"))*gallerie[i].getAttribute("data-height");
			var plane = new THREE.PlaneGeometry( maxWidth,planeWidth, 1 );
			var sourceImage = gallerie[i].getAttribute("src");
			var texture = new THREE.TextureLoader().load(sourceImage,function(){});
			material = new THREE.MeshBasicMaterial( {
				map:texture,
				side: THREE.DoubleSide,
				transparent:true,
				opacity:.60
				} );

			var image = new THREE.Mesh( plane, material );
			var anglePi = ((2*Math.PI)/gallerie.length)*i;
			image.position.z = (Math.cos(anglePi)*rayon);
			image.position.x = Math.sin(anglePi)*rayon;
			image.rotation.y = anglePi;
			scene.add( image);

		};

		// CAMERA
		if(ratio>=1) var camPers = 145*(canvasHeight/canvasWidth);
		else var camPers = 120*(canvasWidth/canvasHeight);
		camera = new THREE.PerspectiveCamera( camPers, canvasWidth/canvasHeight, 0.1, rayon*4 ); 
		camera.position.x = 0;
		camera.position.y = 0;
		camera.position.z = rayon+(rayon/3.5);
		

		// RENDER
		renderer = new THREE.WebGLRenderer({antialias:true, canvas:circle3dCanvas});
		renderer.setSize(canvasWidth, canvasHeight );
		renderer.domElement.addEventListener('mousemove', onClick, false);
		window.addEventListener( 'resize', onWindowResize );

		controls = new OrbitControls( camera, renderer.domElement );
		controls.autoRotate = true;
		controls.enableDamping=true;
		controls.dampingFactor = 0.020;
		controls.enableZoom =false;
		controls.rotateSpeed = 0.20;
		if(ratio<=1) controls.rotateSpeed = 0.40;
		controls.autoRotateSpeed = 0.40;
		controls.maxPolarAngle = Math.PI/1.95;
		controls.minPolarAngle = Math.PI/2.05;
		
	}

	function onClick() {

		event.preventDefault();
		mouse.x = (event.offsetX / canvasWidth) * 2 - 1;
		mouse.y = -(event.offsetY / canvasHeight) * 2 + 1;

		raycaster.setFromCamera(mouse, camera);
		var intersects = raycaster.intersectObject(scene, true);

		if (intersects.length > 0) target = intersects[0].object;
		else target = 0;

	}


	function onWindowResize() {
		clearTimeout(timeOutFunctionId);
        timeOutFunctionId = setTimeout(resizedw, 500);	
	}

	function resizedw(){
		init();
    }


	function animate(){
		if(target!=0){
			scene.traverse( function( object ) { 
				if ( object.isMesh ) {  
					if( (object.material.opacity > 0.60) && (object.uuid!=target.uuid) ){
						object.material.opacity -= 0.01;
					}
					if(target.material.opacity < 1){
						target.material.opacity += 0.05;
					}			
				}
			});
		}
		else{
			scene.traverse( function( object ) { 
				if ( object.isMesh ) {
					if(object.material.opacity > 0.60){
						object.material.opacity -= 0.01;
					}	
				}
			});
		}

		
		requestAnimationFrame( animate );
		material.needsUpdate = true;
		controls.update();
		camera.updateProjectionMatrix();
		renderer.render( scene, camera );
	}

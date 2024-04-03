"use strict";
import * as THREE from './node_modules/three/build/three.module.js';
import * as SkeletonUtils from './node_modules/three/examples/jsm/utils/SkeletonUtils.js';
import { GUI } from './node_modules/three/examples/jsm/libs/lil-gui.module.min.js';
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from './node_modules/three/examples/jsm/loaders/RGBELoader.js';
/// this wrapps some of Threejs to adapt it for Twine
//  - it adds function and data to window.three for access from your code
//  - it adds to event sm.passage.shown a function to initialise some data, see enterPage
//  - it adds to event sm.passage.hidden a function to remove the scenes, see leavePage
//  - you can render multiple scenes in your page; you have to call setupScene to bind a scene to a html-node (<p>,<span>,..)
//  - you have to load models with addModel to show them in a scene
//  - use setAnimation/setMorph to pose/shapekey your model
;(function(){
    window.three = window.three || {views:null,models:null,activeViews:null,clock:null}; 
	const clearColor = new THREE.Color( '#000' );
	/*window.three.main=function() {
	//Note canvas c should have style      position: absolute;      left: 0;      top: 0;      width: 100%;      height: 100%;      display: block;      z-index: -1;
	//the view-spans should have style 		display: inline-block;  width: 5em;  height: 3em;
		const canvas = document.createElement('canvas');
		const renderer = new THREE.WebGLRenderer({antialias: true, canvas, alpha: true});
		renderer.setScissorTest(true);
		const sceneElements = [];
		function addScene( elem, fn ) {
			const ctx = document.createElement('canvas').getContext('2d');
			elem.appendChild(ctx.canvas);
			//sceneElements.push({elem, fn});
			sceneElements.push({elem, ctx, fn});
		}
		const sceneInitFunctionsByName = {
			'box': () => {
			  const {scene, camera} = makeScene();
			  const geometry = new THREE.BoxGeometry(1, 1, 1);
			  const material = new THREE.MeshPhongMaterial({color: 'red'});
			  const mesh = new THREE.Mesh(geometry, material);
			  scene.add(mesh);
			  return (time, rect) => {
				mesh.rotation.y = time * .1;
				camera.aspect = rect.width / rect.height;
				camera.updateProjectionMatrix();
				renderer.render(scene, camera);
			  };
			},
			'pyramid': () => {
			  const {scene, camera} = makeScene();
			  const radius = .8;
			  const widthSegments = 4;
			  const heightSegments = 2;
			  const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
			  const material = new THREE.MeshPhongMaterial({
				color: 'blue',
				flatShading: true,
			  });
			  const mesh = new THREE.Mesh(geometry, material);
			  scene.add(mesh);
			  return (time, rect) => {
				mesh.rotation.y = time * .1;
				camera.aspect = rect.width / rect.height;
				camera.updateProjectionMatrix();
				renderer.render(scene, camera);
			  };
			},
		  };
		function makeScene() {
			const scene = new THREE.Scene();
			const fov = 45;
			const aspect = 2; // the canvas default
			const near = 0.1;
			const far = 5;
			const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
			camera.position.set( 0, 1, 2 );
			camera.lookAt( 0, 0, 0 );
			{
				const color = 0xFFFFFF;
				const intensity = 3;
				const light = new THREE.DirectionalLight( color, intensity );
				light.position.set( - 1, 2, 4 );
				scene.add( light );
			}
			return { scene, camera };
		}
		//this searchs for nodes with data-diagram and adds them for render
		document.querySelectorAll('[data-diagram]').forEach((elem) => {
			const sceneName = elem.dataset.diagram;
			const sceneInitFunction = sceneInitFunctionsByName[sceneName];
			const sceneRenderFunction = sceneInitFunction(elem);
			addScene(elem, sceneRenderFunction);
		  });
		function resizeRendererToDisplaySize( renderer ) {
			const canvas = renderer.domElement;
			const width = canvas.clientWidth;
			const height = canvas.clientHeight;
			const needResize = canvas.width !== width || canvas.height !== height;
			if ( needResize ) {
				renderer.setSize( width, height, false );
			}
			return needResize;
		}
		const clearColor = new THREE.Color( '#000' );
		function render( time ) {
			time *= 0.001;
			resizeRendererToDisplaySize( renderer );
			renderer.setScissorTest( false );
			renderer.setClearColor( clearColor, 0 );
			renderer.clear( true, true );
			renderer.setScissorTest( true );
			const transform = `translateY(${window.scrollY}px)`;
			renderer.domElement.style.transform = transform;
			for (const {elem, fn, ctx} of sceneElements) {
				const rect = elem.getBoundingClientRect();
				const {left, right, top, bottom, width, height} = rect;
				const rendererCanvas = renderer.domElement;
				const isOffscreen =	bottom < 0 ||
					top > window.innerHeight ||
					right < 0 ||
					left > window.innerWidth;
				if ( ! isOffscreen ) {
					// make sure the renderer's canvas is big enough
					if (rendererCanvas.width < width || rendererCanvas.height < height) {
						renderer.setSize(width, height, false);
					}
					// make sure the canvas for this area is the same size as the area
					if (ctx.canvas.width !== width || ctx.canvas.height !== height) {
						ctx.canvas.width = width;
						ctx.canvas.height = height;
					}
					renderer.setScissor(0, 0, width, height);
					renderer.setViewport(0, 0, width, height);
					fn( time, rect );
					// copy the rendered scene to this element's canvas
					ctx.globalCompositeOperation = 'copy';
					ctx.drawImage(
						rendererCanvas,
						0, rendererCanvas.height - height, width, height,  // src rect
						0, 0, width, height);                              // dst rect
				}
			}
			//requestAnimationFrame( render );
		}
		requestAnimationFrame( render );
	}*/
	//this is called internally to do some onetime intialization
    window.three.init=function() {
		if(window.three.views) return;
		$(window).on('sm.passage.hidden', function(event, eventObject){
			window.three.leavePage();	//if we leave a page, the canvas will get invalid
		});
		$(window).on('sm.passage.showing', function(event, eventObject){
			window.three.enterPage();	//if we leave a page, the canvas will get invalid
		});
		//window.three.sceneElements = [];
        const api = { state: 'Idle' };
		//those are some objects for caching instances
		window.three.views={};
		window.three.models={};
		window.three.activeViews={};

		window.three.clock= new THREE.Clock(); //clock is used for animation mixing
		
        //controls= window.three.controls = new OrbitControls( camera, canvas );
		//controls.target.set( 0, 0.5, 0 );
		//controls.update();
		//controls.enablePan = true;
		//controls.enableDamping = true;
    }
	
	//this loads a model into the view
    window.three.addModel=function(view,modelid){
		if(window.three.models[modelid]) {
			postLoad(view,modelid)
		} else {
        const loader = new GLTFLoader();
			loader.load(modelid
			, function ( object ) {
				window.three.models[modelid]={model:object.scene,anims:object.animations};
				postLoad(view,modelid);
				}, undefined, function ( e ) {console.error( e );	} );
		}
		function postLoad(view,modelid){
			if(window.three.views[view].mixers[modelid]) return;
			let face=null,morphs={keys:{},values:{}};
			const mcopy = SkeletonUtils.clone( window.three.models[modelid].model );
			const mixer = new THREE.AnimationMixer( mcopy ); //the mixer is necessary for animation or posing
			window.three.views[view].mixers[modelid]=mixer; //todo if we add same model multiple times, we would need multiple mixers
			// get actions
			let action,actions={};
			window.three.views[view].actions[modelid]={};
			for(var x of window.three.models[modelid].anims) {
				action = mixer.clipAction( x );
				action.clampWhenFinished = true; action.loop = THREE.LoopOnce; //should freeze into pose
				window.three.views[view].actions[modelid][x.name]=action;
			}
			
			// get morphs
			mcopy.traverse( function ( child ) { //find the first Object3D with morphTargets; todo and if there are multiple? 
				if(!face && child.morphTargetDictionary){
					face=child;
				}
			});
			face = mcopy.getObjectByName( 'Head_4' ); //Todo !! Robot has multiple objects with morphtargets - pick the right one
			if(face) {
				morphs.keys=Object.keys( face.morphTargetDictionary );
				morphs.values=face.morphTargetInfluences;
			}
			window.three.views[view].morphs[modelid]=morphs;

			//mixer.addEventListener( 'loop', function( e ) {//console.log(e); // properties of e: type, action and loopDelta
			//	e.action.paused=true; //stop looping action; this is an alternative to set LoopOnce
			//} ); //looping anims dont fire finished
			window.three.views[view].scene.add( mcopy );
		}
		
    }
	window.three.enterPage=function(){ //call this when entering a passage to flush out scenes to render 	TODO use sm.passage.shown
		window.three.activeViews={};window.three.views={};
		const canvas = document.createElement('canvas');
		window.three.renderer = new THREE.WebGLRenderer({antialias: true, canvas, alpha: true});
	}
	window.three.leavePage=function(){ //call this when leaving a passage to flush out scenes to render 
		window.three.activeViews={};window.three.views={};
	}
	//creates a scene in a element-node with id=elemid(f.e. <p id="canvas">). The scene has to have a unique id.
	//builder is a function that should add the model to your scene. If you suplly NULL, a red cube gets shown. You can also use addModel.
    window.three.setupScene=function(id,elemid,builder=null){ //Warning ! you may only setup 8 or so renderers in a browser ! A workaround: https://threejs.org/manual/#en/multiple-scenes
		function makeScene() {
			const scene = new THREE.Scene();
			const fov = 45;
			const aspect = 2; // the canvas default
			const near = 0.1;
			const far = 5;
			const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
			camera.position.set( 0, 1, 2 );
			camera.position.z = 5,camera.position.y = 5;
			camera.lookAt( 0, 0, 0 );
			{
				const color = 0xFFFFFF;
				const intensity = 3;
				const light = new THREE.DirectionalLight( color, intensity );
				light.position.set( - 1, 2, 4 );
				scene.add( light );
			}
			return { scene, camera };
		}
		if(window.three.views[id]){
			window.three.activeViews[id]=window.three.views[id];
		}else{
			let renderer=window.three.renderer;
			//renderer.setScissorTest(true);
			//renderer.setSize(width,height );//canvas.innerWidth, canvas.innerHeight );
			//renderer.setPixelRatio( window.devicePixelRatio );
			//renderer.outputEncoding = THREE.sRGBEncoding;

			const {scene, camera} = makeScene();
			if(builder==null){ //add box
				const geometry = new THREE.BoxGeometry(1, 1, 1);
				const material = new THREE.MeshPhongMaterial({color: 'red'});
				const mesh = new THREE.Mesh(geometry, material);
				scene.add(mesh);
			}
			const ctx = document.createElement('canvas').getContext('2d'); //append a canvas to the element where is drawn too
			const elem = document.getElementById(elemid)
			elem.appendChild(ctx.canvas);
			function renderUpdate(time,rect){
				camera.aspect = rect.width / rect.height;
				camera.updateProjectionMatrix();
				renderer.render(scene, camera);
			}

			window.three.views[id]={scene:scene,
				elem:elem,
				ctx:ctx,
				renderUpdate:renderUpdate,
				camera:camera,
				//renderer:renderer, 
				mixers:{}, //contains for each object in the scene their mixer 
				actions:{},//contains for each object in the scene a collection of actions  actions[modelid].[actionname]
				morphs:{}}; //contains for each object in the scene a collection of morphs  morphs[modelid].[morphname].influence
			window.three.activeViews[id]=window.three.views[id];
		}
        animate();
    }
	//this uses animation to get into a pose; the duration is set to 0; make sure action is set to LoopOnce and clampWhenFinished
	window.three.setAnimation=function(sceneid,modelid,poseid){
		let action,mixer=window.three.views[sceneid].mixers[modelid];
		let actions = Object.keys(window.three.views[sceneid].actions[modelid]);
		//mixer.stopAllAction(); //if already running an action;  this will reset morphs! 
		for(var x of actions){ //need to stop other actions first
			action=window.three.views[sceneid].actions[modelid][x];
			if(action.isRunning) action.fadeOut(0);
		}
		action = window.three.views[sceneid].actions[modelid][poseid];
		
		action.reset()
		.setEffectiveTimeScale( 1 )
		.setEffectiveWeight( 1 )
		.setDuration(0) //if you set this to 1, full animation will play !
		//.fadeIn( 1 )
		.play();
	}
	//this modifiys a shapekey
	window.three.setMorph=function(sceneid,modelid,morphid,influence){
		const names = window.three.views[sceneid].morphs[modelid].keys;
		const i=names.indexOf(morphid);
		if(i<0) return;
		window.three.views[sceneid].morphs[modelid].values[i]=influence;
	}
	window.three.toogleCam=function (sceneid){
		let camera =window.three.views[sceneid].camera;
		if(camera.position.z===1) {
			camera.position.z=0.5
		}else {
			camera.position.z=1;
		}
		//camera.lookAt(new THREE.Vector3(0,1,0));
	}
	function animate() { //called to start the renderer
        const dt = window.three.clock.getDelta();
        const renderer=window.three.renderer;
		resizeRendererToDisplaySize( renderer );
		renderer.setScissorTest( false );
		renderer.setClearColor( clearColor, 0 );
		renderer.clear( true, true );
		renderer.setScissorTest( true );
		const transform = `translateY(${window.scrollY}px)`; //this makes the render scroll in sync with the html
		renderer.domElement.style.transform = transform;
		const views=Object.keys(window.three.activeViews);
		let view,mixer;
		for(var x of views) { //there could be multiple pictures in a passage... 
			view=window.three.activeViews[x];
			const ctx=view.ctx;
			//view.renderer.render( view.scene, view.camera );
			const mixers=Object.keys(view.mixers);
			for(var y of mixers) {
				mixer=window.three.activeViews[x].mixers[y];
				if(mixer) mixer.update( dt );
			}
			const rect = view.elem.getBoundingClientRect();
			const {left, right, top, bottom, width, height} = rect;
			const rendererCanvas = renderer.domElement;
			const isOffscreen =	bottom < 0 ||
				top > window.innerHeight ||
				right < 0 ||
				left > window.innerWidth;
			if ( ! isOffscreen ) {
				// make sure the renderer's canvas is big enough
				if (rendererCanvas.width < width || rendererCanvas.height < height) {
					renderer.setSize(width+1, height+1, false);
				}
				// make sure the canvas for this area is the same size as the area
				if (ctx.canvas.width !== width || ctx.canvas.height !== height) {
					ctx.canvas.width = width;
					ctx.canvas.height = height;
				}
				renderer.setScissor(0, 0, width, height);
				renderer.setViewport(0, 0, width, height);
				view.renderUpdate( dt, rect );
				// copy the rendered scene to this element's canvas
				ctx.globalCompositeOperation = 'copy';
				ctx.drawImage(
					rendererCanvas,
					0, rendererCanvas.height - height, width, height,  // src rect
					0, 0, width, height);                              // dst rect
			}
		}
        requestAnimationFrame( animate ); //this will cause animate to be called cyclical - we wouldnt need that except for animation
		//todo only call animate or if there is a change in the scene
    };
	function resizeRendererToDisplaySize( renderer ) {
		const canvas = renderer.domElement;
		const width = canvas.clientWidth;
		const height = canvas.clientHeight;
		const needResize = canvas.width !== width || canvas.height !== height;
		if ( needResize ) {
			renderer.setSize( width, height, false );
		}
		return needResize;
	}
	
	window.three.init();
})(window);
//export {show };
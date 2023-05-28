import './style.css'
import * as THREE from 'three';
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import 'vite/modulepreload-polyfill'
//import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

document.querySelector('#app').innerHTML = `
  <div id="dialogue">
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>MUFF MUFF!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`
document.getElementsByClassName('sap').innerHTML = "<embed src='https://images.mein-mmo.de/medien/2021/07/LoL-Thresh.v1.jpg'>"
//var path = document.getElementById("can")
//var width = document.getElementById('')

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 10000 );
const renderer = new THREE.WebGLRenderer({canvas: can});
//const controls = new OrbitControls( camera, renderer.domElement );

const g1 = new THREE.BoxGeometry( 1.25, 1.25, .25 );
const gw1 = new THREE.BoxGeometry( 1, 4, .25 );
const m1 = new THREE.MeshBasicMaterial( { emissive: 0xAA0000, emissiveIntensity: 10 } );
const mw1 = new THREE.MeshBasicMaterial( { emissive: 0xFFFFFF, emissiveIntensity: 10 } );
const mww1 = new THREE.MeshBasicMaterial( { color: 0x00AA00, transparent:true, opacity:0.5 } );

const cube = new THREE.Mesh( g1, m1 );
const cube1 = new THREE.Mesh( g1, m1 );
const cube2 = new THREE.Mesh( g1, m1 );
const wleft = new THREE.Mesh(gw1, mw1);
const wright = new THREE.Mesh(gw1, mw1);
const wwleft = new THREE.Mesh(gw1, mww1);
const wwright = new THREE.Mesh(gw1, mww1);

//const l2 = new THREE.PointLight(0x00AA00, 1, 1000);
const l1 = new THREE.SpotLight(0xFFFFFF, 5, 100);

const point = new THREE.Vector3(0, 1, 1.75);
const a = new THREE.Vector3(0, 1, 0);
const axis = a.normalize();
var b = 0;


const fbxLoader = new FBXLoader()
fbxLoader.load(
    'bodysmall.fbx',
    (object) => {
      //object.position.x = 50;
      object.scale.set(0.02, 0.02, 0.02);
      object.translateZ(1);
      object.rotation.y = 90*((2*Math.PI)/360);
        // object.traverse(function (child) {
        //     if ((child as THREE.Mesh).isMesh) {
        //         // (child as THREE.Mesh).material = material
        //         if ((child as THREE.Mesh).material) {
        //             ((child as THREE.Mesh).material as THREE.MeshBasicMaterial).transparent = false
        //         }
        //     }
        // })
        // object.scale.set(.01, .01, .01)
        //object.updateMatrix();
        scene.add(object)
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
  //cube.rotateX(1/360);
  //cube.rotateY(1/360);
  /* axisrota(cube, point, axis, 0.0174533);
  axisrota(cube1, point, axis, 0.0174533);
  axisrota(cube2, point, axis, 0.0174533); */

  var angle = 0.0174533/2;

  axisrota(cube, point, axis, angle);
  axisrota(cube1, point, axis, angle);
  axisrota(cube2, point, axis, angle);

  if(b==240){
    var col = Math.random()*0xFFFFFF;
    cube.material.color.setHex(col);
    cube1.material.color.setHex(col);
    cube2.material.color.setHex(col);
    b = 0;
  }
  b++;

  //controls.update();
}

// following function declaration from "https://stackoverflow.com/questions/42812861/three-js-pivot-point/42866733#42866733" reply by TheJim01
function axisrota(obj, point, axis, theta, pointIsWorld){
  pointIsWorld = (pointIsWorld === undefined)? false : pointIsWorld;
  if(pointIsWorld){
    obj.parent.localToWorld(obj.position); // compensate for world coordinate
  }
  obj.position.sub(point); // remove the offset
  obj.position.applyAxisAngle(axis, theta); // rotate the POSITION
  obj.position.add(point); // re-add the offset
  if(pointIsWorld){
    obj.parent.worldToLocal(obj.position); // undo world coordinates compensation
  }
  obj.rotateOnAxis(axis, theta); // rotate the OBJECT
}


renderer.setSize( window.innerWidth, window.innerHeight );
scene.add( cube );
scene.add( cube1 );
scene.add( cube2 );
scene.add( wleft );
scene.add( wright );
scene.add( wwleft );
scene.add( wwright );
scene.add( l1 );


camera.position.z = 5;
l1.position.z = 3;
l1.position.y = 5;
//camera.rotation.x = 90 /* * Math.PI / 180 */;
//controls.target = new THREE.Vector3(5, 0, 5);
//controls.update();

wleft.translateX(3); // 2.5 as value quit good
wleft.translateZ(1); //2 as value quit good
wright.translateX(-3);
wright.translateZ(1);

wwleft.translateX(3); // 2.5 as value quit good
wwleft.translateZ(1.25); //2 as value quit good
wwright.translateX(-3);
wwright.translateZ(1.25);
axisrota(cube1, point, axis, 2.09439510239);
axisrota(cube2, point, axis, 4.18879020479);


animate();


setupCounter(document.querySelector('#counter'))


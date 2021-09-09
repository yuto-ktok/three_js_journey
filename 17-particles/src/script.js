import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { ParametricGeometry } from 'three'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const particleTexutre = textureLoader.load('/textures/particles/2.png')

/**
 * Particles
 */
// geometory
//const particlesGeometory = new THREE.SphereBufferGeometry(1, 32, 32)

const particlesGeometory = new THREE.BufferGeometry()
const count = 20000

const positions = new Float32Array(count*3)
const colors = new Float32Array(count*3)

for(let i = 0; i < count * 3; i++){
    positions[i] = (Math.random() - 0.5) * 10
    colors[i] = Math.random()
}

particlesGeometory.setAttribute(
    'position',
    new THREE.BufferAttribute(positions, 3)
)

particlesGeometory.setAttribute(
    'color',
    new THREE.BufferAttribute(colors, 3)
)

// material
const particlesMaterical = new THREE.PointsMaterial({
    size: 0.1,
    sizeAttenuation: true
})
//particlesMaterical.color = new THREE.Color('#ff88cc')
//particlesMaterical.color = new THREE.Color('#ff0000')
particlesMaterical.alphaMap = particleTexutre
particlesMaterical.transparent = true

// FIX IDEA 1
//particlesMaterical.alphaTest = 0.001

// FIX IDEA 2
//particlesMaterical.depthTest = false 

// FIX IDEA3 <= its great
particlesMaterical.depthWrite = false

particlesMaterical.blending = THREE.AdditiveBlending
particlesMaterical.vertexColors = true

// points
const particles = new THREE.Points(particlesGeometory, particlesMaterical)
scene.add(particles)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update particles
   // particles.rotation.y = - elapsedTime * 0.2
   

   // NOTE: not so good for performance. We should make new shader for good performance. (future lesson topic)
   for(let i = 0; i < count; i++){
       const i3 = i * 3
       const x = particlesGeometory.attributes.position.array[i3]
       particlesGeometory.attributes.position.array[i3+1] = Math.sin(elapsedTime + x)
   }

   particlesGeometory.attributes.position.needsUpdate = true


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
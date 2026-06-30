import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { createSkyBox } from './Skybox'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default function JogoFase() {
  const refContainer = useRef(null)
  const [score, setScore]   = useState(0)
  const [ganhou, setGanhou] = useState(false)

  useEffect(() => {
    const container = refContainer.current
    const { width, height } = container.getBoundingClientRect()

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(width, height)
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 2, 10)

    window.addEventListener('resize', () => {
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }, false)

    const controls = new OrbitControls(camera, renderer.domElement)

    const light = new THREE.AmbientLight(0xffffff, 10)
    scene.add(light)

    const plight = new THREE.PointLight(0xffffff, 50, 50)
    plight.position.set(0, 25, -10)
    scene.add(plight)

    //cria a skybox
    const initSkybox = async () => {
      const skyBox = await createSkyBox('docklands', 250)
      skyBox.position.y = 1
      scene.add(skyBox)
    }

    initSkybox()

    //cria a caixa para coletar doacoes
    const box = new THREE.Group()
    const boxBody = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.1, 1.1), new THREE.MeshStandardMaterial({ color: 0xE8A968 }))
    box.add(boxBody)
    box.position.set(0, 0.55, 0)
    scene.add(box)

    const joystick = { x: null, y: null }

    const boxHit    = new THREE.Sphere(box.position.clone(), 0.8)
    const hitSphere = new THREE.Sphere(new THREE.Vector3(), 0.5)

    const itemColors = [0xEB6767, 0x6AADDE]
    const baseItem   = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), new THREE.MeshStandardMaterial())//cria esfera
    const itemsQtd   = 10

    //gera itens para coleta de forma aleatoria
    const items = Array.from({ length: itemsQtd }).map((_, i) => {
      const color = itemColors[i % itemColors.length]
      const model = baseItem.clone()//cria uma copia da esfera
      model.material = new THREE.MeshStandardMaterial({ color, emissive: new THREE.Color(color), emissiveIntensity: 0.3 })//cria o novo material para esse item
      model.position.set((Math.random() - 0.5) * 8, 0.5, -(Math.random() * 150 + 50))//posiciona aleatoriamente
      scene.add(model)
      return { 
        model, 
        hit: hitSphere.clone(),
        lastCollectedTime: -1000 
      }
    })
    items.forEach(item => item.hit.center.copy(item.model.position))//sincroniza posicao de colisao com visual

    let totalScore  = 0
    let GAME_PAUSED = false

    function moveItem(item) {
      item.model.position.z += 0.15
      item.model.rotation.y += 0.03
      if (item.model.position.z > 5) {
        item.model.position.z = -(Math.random() * 100 + 10)
        item.model.position.x = (Math.random() - 0.5) * 8
      }
      item.hit.center.copy(item.model.position)
    }

    function wasCollected(item) {
      return boxHit.intersectsSphere(item.hit)
    }

    function showCollected(item) {
      item.model.position.z = -(Math.random() * 100 + 10)
      item.model.position.x = (Math.random() - 0.5) * 8
      item.hit.center.copy(item.model.position)
      totalScore++
      setScore(totalScore)
      if (totalScore >= 10) {
        GAME_PAUSED = true
        setGanhou(true)
      }
    }

    function moveBox() {
      let moveAmount = 0
      
      if (box && joystick.x) {
        const ww = container.clientWidth
        const newX = box.position.x + (joystick.x - ww / 2) / ww * 0.25
        box.position.x = Math.max(-3, Math.min(3, newX))
      }
      
      if (keys.left) moveAmount = -0.15
      if (keys.right) moveAmount = 0.15
      
      if (moveAmount !== 0) {
        const newX = box.position.x + moveAmount
        box.position.x = Math.max(-3, Math.min(3, newX))
      }
      
      boxHit.center.copy(box.position)
    }

    function updateJoystick(event) {
      joystick.x = event.clientX
      joystick.y = event.clientY
    }

    window.addEventListener('mousemove', updateJoystick)

    const keys = { left: false, right: false }

    window.addEventListener('keydown', (evento) => {
      if (evento.key === 'ArrowLeft' || evento.key === 'a' || evento.key === 'A') 
        keys.left = true
      if (evento.key === 'ArrowRight' || evento.key === 'd' || evento.key === 'D') 
        keys.right = true
    })

    window.addEventListener('keyup', (evento) => {
      if (evento.key === 'ArrowLeft' || evento.key === 'a' || evento.key === 'A') 
        keys.left = false
      if (evento.key === 'ArrowRight' || evento.key === 'd' || evento.key === 'D') 
        keys.right = false
    })

    function animate() {
      controls.update()
      if (!GAME_PAUSED) {
        moveBox()
        items.forEach(item => {
          moveItem(item)
          if (wasCollected(item)) showCollected(item)
        })
      }
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('mousemove', updateJoystick)
      window.removeEventListener('keydown', updateJoystick)  
      window.removeEventListener('keyup', updateJoystick)   
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  return (
    <div ref={refContainer} style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', top: 16, left: 16, zIndex: 10,
        background: 'rgba(60,71,77,0.88)', color: '#E8A968',
        padding: '8px 22px', borderRadius: 8, fontWeight: 'bold', fontSize: 22,
        fontFamily: 'Open Sans, sans-serif', pointerEvents: 'none',
      }}>
        Pontos: {score}
      </div>

      {ganhou && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 20,
          background: 'rgba(0,0,0,0.75)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Open Sans, sans-serif',
        }}>
          <h2 style={{ fontSize: 38, fontWeight: 'bold', color: '#E8A968', marginBottom: 12 }}>
            Parabens!
          </h2>
          <p style={{ fontSize: 18, color: '#F9F9F9', marginBottom: 28 }}>
            Voce coletou 10 doacoes!
          </p>
        </div>
      )}
    </div>
  )
}

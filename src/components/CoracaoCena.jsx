import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

const CoracaoCena = () => {
  const refMontagem = useRef(null);

  useEffect(() => {
    let idAnimacao;
    const montagemAtual = refMontagem.current;
    const { width: largura, height: altura } = montagemAtual.getBoundingClientRect();

    const cena = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(50, largura / altura, 0.1, 1000);
    camera.position.set(0, 5, 25);

    const renderizador = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderizador.setSize(largura, altura);
    renderizador.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    renderizador.shadowMap.enabled = true;
    renderizador.shadowMap.type = THREE.PCFShadowMap; 
    montagemAtual.appendChild(renderizador.domElement);

    const luzAmbiente = new THREE.AmbientLight(0xffffff, 0.7);
    cena.add(luzAmbiente);
    
    const luzDirecional = new THREE.DirectionalLight(0xffffff, 1.8);
    luzDirecional.position.set(10, 25, 10);
    luzDirecional.castShadow = true;
    cena.add(luzDirecional);

    const carregadorTextura = new THREE.TextureLoader();
    const texturaCeu = carregadorTextura.load('/skybox.jpg'); 
    texturaCeu.mapping = THREE.EquirectangularReflectionMapping;
    cena.environment = texturaCeu;

    const materialVermelho = new THREE.MeshStandardMaterial({
      color: 0xe53935, 
      roughness: 0.4,
      metalness: 0.1
    });

    let modeloCoracao = null;
    const carregadorMtl = new MTLLoader();
    
    carregadorMtl.load('/3D/heart-icon.mtl', (materiais) => {
      materiais.preload();
      
      const carregadorObj = new OBJLoader();
      carregadorObj.setMaterials(materiais);
      
      carregadorObj.load('/3D/heart-icon.obj', (objeto) => {
        modeloCoracao = objeto;
        
        modeloCoracao.traverse((filho) => {
          if (filho.isMesh) {
            filho.material = materialVermelho; 
            filho.castShadow = true;
            filho.receiveShadow = true;
          }
        });

        const caixaBorda = new THREE.Box3().setFromObject(modeloCoracao);
        const dimensoes = new THREE.Vector3();
        caixaBorda.getSize(dimensoes);
        
        const dimensaoMaxima = Math.max(dimensoes.x, dimensoes.y, dimensoes.z);
        if (dimensaoMaxima > 0) {
          const escalaProporcional = 7 / dimensaoMaxima; 
          modeloCoracao.scale.set(escalaProporcional, escalaProporcional, escalaProporcional);
        }
        
        const centroObjeto = caixaBorda.getCenter(new THREE.Vector3());
        modeloCoracao.position.copy(centroObjeto).multiplyScalar(-modeloCoracao.scale.x);
        
        cena.add(modeloCoracao);
      });
    });

    const teclas = { w: false, a: false, s: false, d: false };
    const posicaoMouse = { x: 0, y: 0 };

    const aoPressionarTecla = (evento) => {
      const tecla = evento.key.toLowerCase();
      if (Object.hasOwn(teclas, tecla)) teclas[tecla] = true;
    };

    const aoSoltarTecla = (evento) => {
      const tecla = evento.key.toLowerCase();
      if (Object.hasOwn(teclas, tecla)) teclas[tecla] = false;
    };

    const aoMoverMouse = (evento) => {
      posicaoMouse.x = (evento.clientX / window.innerWidth) * 2 - 1;
      posicaoMouse.y = -(evento.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('keydown', aoPressionarTecla);
    window.addEventListener('keyup', aoSoltarTecla);
    window.addEventListener('mousemove', aoMoverMouse);

    const animar = () => {
      idAnimacao = requestAnimationFrame(animar);

      const velocidade = 0.5;
      if (teclas.w) camera.position.z -= velocidade;
      if (teclas.s) camera.position.z += velocidade;
      if (teclas.a) camera.position.x -= velocidade;
      if (teclas.d) camera.position.x += velocidade;

      if (modeloCoracao) {
        modeloCoracao.rotation.y += (posicaoMouse.x * 0.5 - modeloCoracao.rotation.y) * 0.1;
        modeloCoracao.rotation.x += (-posicaoMouse.y * 0.5 - modeloCoracao.rotation.x) * 0.1;
      }
      
      camera.lookAt(0, 0, 0);
      renderizador.render(cena, camera);
    };

    animar();

    const tratarRedimensionamento = () => {
      const novaLargura = montagemAtual.clientWidth;
      const novaAltura = montagemAtual.clientHeight;
      camera.aspect = novaLargura / novaAltura;
      camera.updateProjectionMatrix();
      renderizador.setSize(novaLargura, novaAltura);
    };
    window.addEventListener('resize', tratarRedimensionamento);

    return () => {
      cancelAnimationFrame(idAnimacao);
      window.removeEventListener('keydown', aoPressionarTecla);
      window.removeEventListener('keyup', aoSoltarTecla);
      window.removeEventListener('mousemove', aoMoverMouse);
      window.removeEventListener('resize', tratarRedimensionamento);
      
      if (montagemAtual && renderizador.domElement) {
        montagemAtual.removeChild(renderizador.domElement);
      }
      renderizador.dispose();
    };
  }, []);

  return (
    <div 
      ref={refMontagem} 
      className="w-full h-full" 
      style={{ minHeight: '500px' }} 
    />
  );
};

export default CoracaoCena;
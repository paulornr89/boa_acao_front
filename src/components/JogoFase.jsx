import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function JogoFase({ aoFechar }) {
  const refContainer = useRef(null);
  const [coletados, setColetados] = useState(0);
  const [vitoria, setVitoria] = useState(false);

  useEffect(() => {
    const container = refContainer.current;
    const { width, height } = container.getBoundingClientRect();

    // ─── RENDERER ─────────────────────────────────────────────────────────────
    const renderizador = new THREE.WebGLRenderer({ antialias: true });
    renderizador.setSize(width, height);
    renderizador.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderizador.shadowMap.enabled = true;
    renderizador.shadowMap.type = THREE.PCFSoftShadowMap;
    renderizador.domElement.style.display = 'block';
    container.appendChild(renderizador.domElement);

    // ─── CENA & CÂMERA ────────────────────────────────────────────────────────
    const cena = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 500);

    // ─── SKYBOX — ShaderMaterial com gradiente (requisito acadêmico: SkyBox) ──
    // Usa BackSide para renderizar o interior da esfera como céu.
    // O fragmentShader interpola entre laranja (horizonte) e azul (zênite)
    // com base na componente Y normalizada da posição do vértice.
    const skydomeMat = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      uniforms: {
        corTopo:  { value: new THREE.Color(0x5BAEE0) },
        corBase:  { value: new THREE.Color(0xF0B06A) },
      },
      vertexShader: `
        varying vec3 vPos;
        void main() {
          vPos = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 corTopo;
        uniform vec3 corBase;
        varying vec3 vPos;
        void main() {
          float t = clamp((normalize(vPos).y + 0.25) / 1.25, 0.0, 1.0);
          gl_FragColor = vec4(mix(corBase, corTopo, t), 1.0);
        }
      `,
    });
    cena.add(new THREE.Mesh(new THREE.SphereGeometry(300, 32, 32), skydomeMat));

    // ─── LUZES ────────────────────────────────────────────────────────────────
    cena.add(new THREE.AmbientLight(0xffffff, 0.75));

    const luzDir = new THREE.DirectionalLight(0xffffff, 1.5);
    luzDir.position.set(20, 40, 20);
    luzDir.castShadow = true;
    luzDir.shadow.mapSize.set(1024, 1024);
    Object.assign(luzDir.shadow.camera, { near: 0.1, far: 200, left: -55, right: 55, top: 55, bottom: -55 });
    cena.add(luzDir);

    // ─── CHÃO ─────────────────────────────────────────────────────────────────
    const chao = new THREE.Mesh(
      new THREE.PlaneGeometry(90, 90),
      new THREE.MeshStandardMaterial({ color: 0x3C474D })
    );
    chao.rotation.x = -Math.PI / 2;
    chao.receiveShadow = true;
    cena.add(chao);

    // Calçadas / faixas de rua para dar profundidade ao cenário urbano
    const calçadaMat = new THREE.MeshStandardMaterial({ color: 0x505C62 });
    [
      [0, 0, 80, 4],
      [0, 0, 4, 80],
    ].forEach(([x, z, w, d]) => {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), calçadaMat);
      m.rotation.x = -Math.PI / 2;
      m.position.set(x, 0.01, z);
      m.receiveShadow = true;
      cena.add(m);
    });

    // ─── PRÉDIOS — BoxGeometry (requisito acadêmico: modelos 3D) ──────────────
    const dadosPredios = [
      { x: 10,  z: -5,  w: 4, h: 12, d: 4, cor: 0x8899AA },
      { x: -8,  z: -10, w: 5, h: 8,  d: 5, cor: 0xAABBCC },
      { x: 15,  z: 10,  w: 3, h: 16, d: 3, cor: 0x99AABB },
      { x: -15, z: 5,   w: 4, h: 10, d: 4, cor: 0x778899 },
      { x: -5,  z: 15,  w: 6, h: 6,  d: 6, cor: 0xBBCCDD },
      { x: 20,  z: -15, w: 3, h: 14, d: 3, cor: 0x889966 },
      { x: -20, z: -8,  w: 5, h: 9,  d: 4, cor: 0x778866 },
      { x: 8,   z: 18,  w: 4, h: 11, d: 4, cor: 0x99AABB },
      { x: -12, z: -20, w: 3, h: 7,  d: 5, cor: 0xAABBCC },
      { x: 25,  z: 5,   w: 4, h: 13, d: 4, cor: 0x8899AA },
      { x: -25, z: 15,  w: 5, h: 8,  d: 5, cor: 0x9AABBB },
      { x: 5,   z: -18, w: 4, h: 10, d: 4, cor: 0x889900 },
      { x: -30, z: -5,  w: 3, h: 15, d: 3, cor: 0x778899 },
      { x: 30,  z: -10, w: 4, h: 9,  d: 4, cor: 0xBBCCDD },
    ];

    dadosPredios.forEach(({ x, z, w, h, d, cor }) => {
      const predio = new THREE.Mesh(
        new THREE.BoxGeometry(w, h, d),
        new THREE.MeshStandardMaterial({ color: cor })
      );
      predio.position.set(x, h / 2, z);
      predio.castShadow = true;
      predio.receiveShadow = true;
      cena.add(predio);
    });

    // ─── PERSONAGEM — geometria composta (requisito acadêmico) ────────────────
    // Caixinha de doação âmbar: corpo + tampa + laço
    const grupoPersonagem = new THREE.Group();

    const corpo = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 1.2, 1.2),
      new THREE.MeshStandardMaterial({ color: 0xE8A968 })
    );
    corpo.castShadow = true;
    grupoPersonagem.add(corpo);

    const tampa = new THREE.Mesh(
      new THREE.BoxGeometry(1.4, 0.22, 1.4),
      new THREE.MeshStandardMaterial({ color: 0xD4944A })
    );
    tampa.position.y = 0.71;
    tampa.castShadow = true;
    grupoPersonagem.add(tampa);

    // Laço em cima da caixinha (parte horizontal e vertical formam a cruz)
    const lacoMat = new THREE.MeshStandardMaterial({ color: 0xEB6767 });
    const lacoH = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.15, 0.15), lacoMat);
    lacoH.position.y = 1.0;
    grupoPersonagem.add(lacoH);
    const lacoV = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.15, 0.7), lacoMat);
    lacoV.position.y = 1.0;
    grupoPersonagem.add(lacoV);

    grupoPersonagem.position.set(0, 2.5, 0);
    cena.add(grupoPersonagem);

    // ─── ITENS DE DOAÇÃO — SphereGeometry (requisito acadêmico) ───────────────
    const coresItens = [0xE8A968, 0xEB6767, 0x6AADDE, 0x88CC88, 0xFFDD66];
    const posicoesBase = [
      new THREE.Vector3(12,  2.5,  -3),
      new THREE.Vector3(-10, 2.5,   8),
      new THREE.Vector3(5,   2.5,  14),
      new THREE.Vector3(-18, 2.5,  -6),
      new THREE.Vector3(18,  2.5,  12),
    ];

    const itens = posicoesBase.map((pos, i) => {
      const esfera = new THREE.Mesh(
        new THREE.SphereGeometry(0.75, 20, 20),
        new THREE.MeshStandardMaterial({
          color: coresItens[i],
          emissive: new THREE.Color(coresItens[i]),
          emissiveIntensity: 0.35,
        })
      );
      esfera.position.copy(pos);
      esfera.castShadow = true;
      cena.add(esfera);
      return { mesh: esfera, coletado: false, posBase: pos.clone() };
    });

    // ─── PARTÍCULAS — Points (requisito acadêmico: efeito extra) ──────────────
    const sistemasParticulas = [];

    function criarExplosao(posicao, cor) {
      const count = 60;
      const posArray = new Float32Array(count * 3);
      const velocidades = [];

      for (let i = 0; i < count; i++) {
        posArray[i * 3]     = posicao.x;
        posArray[i * 3 + 1] = posicao.y;
        posArray[i * 3 + 2] = posicao.z;
        // Velocidade inicial aleatória em cone para cima
        velocidades.push(new THREE.Vector3(
          (Math.random() - 0.5) * 0.28,
          Math.random() * 0.22 + 0.05,
          (Math.random() - 0.5) * 0.28
        ));
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      const mat = new THREE.PointsMaterial({
        color: cor,
        size: 0.28,
        sizeAttenuation: true,
        transparent: true,
        opacity: 1,
      });
      const pontos = new THREE.Points(geo, mat);
      cena.add(pontos);
      sistemasParticulas.push({ pontos, velocidades, vida: 1.0 });
    }

    // ─── ESTADO DO JOGO ───────────────────────────────────────────────────────
    let totalColetados = 0;
    const teclas = {};

    // Câmera orbital em coordenadas esféricas ao redor do personagem
    // anguloH = rotação horizontal, anguloV = elevação, distancia = raio
    const camOrbit = { anguloH: 0, anguloV: 0.65, distancia: 14 };
    const estadoMouse = { arrastando: false, ultimoX: 0, ultimoY: 0 };

    // ─── CONTROLES DE TECLADO (requisito acadêmico: interatividade de teclado) ─
    const aoTeclarDown = (e) => { teclas[e.code] = true; };
    const aoTeclarUp   = (e) => { teclas[e.code] = false; };

    // ─── CONTROLES DE MOUSE (requisito acadêmico: rotação manual via drag) ─────
    // Drag horizontal → anguloH (gira ao redor do eixo Y)
    // Drag vertical   → anguloV (eleva ou abaixa a câmera)
    const aoMouseDown = (e) => {
      estadoMouse.arrastando = true;
      estadoMouse.ultimoX = e.clientX;
      estadoMouse.ultimoY = e.clientY;
    };
    const aoMouseMove = (e) => {
      if (!estadoMouse.arrastando) return;
      const dx = e.clientX - estadoMouse.ultimoX;
      const dy = e.clientY - estadoMouse.ultimoY;
      camOrbit.anguloH -= dx * 0.008;
      camOrbit.anguloV = Math.max(0.15, Math.min(1.45, camOrbit.anguloV + dy * 0.006));
      estadoMouse.ultimoX = e.clientX;
      estadoMouse.ultimoY = e.clientY;
    };
    const aoMouseUp = () => { estadoMouse.arrastando = false; };

    // Scroll para zoom (não pode ser passive para chamar preventDefault)
    const aoScroll = (e) => {
      e.preventDefault();
      camOrbit.distancia = Math.max(4, Math.min(38, camOrbit.distancia + e.deltaY * 0.025));
    };

    window.addEventListener('keydown', aoTeclarDown);
    window.addEventListener('keyup',   aoTeclarUp);
    renderizador.domElement.addEventListener('mousedown', aoMouseDown);
    window.addEventListener('mousemove', aoMouseMove);
    window.addEventListener('mouseup',   aoMouseUp);
    renderizador.domElement.addEventListener('wheel', aoScroll, { passive: false });

    // ─── LOOP DE ANIMAÇÃO ─────────────────────────────────────────────────────
    let idFrame;
    const relogio = new THREE.Clock();

    const animar = () => {
      idFrame = requestAnimationFrame(animar);
      const dt = relogio.getDelta();
      const t  = relogio.getElapsedTime();

      // Movimento do personagem relativo ao ângulo horizontal da câmera (WASD / setas)
      const vel  = 7 * dt;
      const sinH = Math.sin(camOrbit.anguloH);
      const cosH = Math.cos(camOrbit.anguloH);

      if (teclas['KeyW'] || teclas['ArrowUp']) {
        grupoPersonagem.position.x -= sinH * vel;
        grupoPersonagem.position.z -= cosH * vel;
      }
      if (teclas['KeyS'] || teclas['ArrowDown']) {
        grupoPersonagem.position.x += sinH * vel;
        grupoPersonagem.position.z += cosH * vel;
      }
      if (teclas['KeyA'] || teclas['ArrowLeft']) {
        grupoPersonagem.position.x -= cosH * vel;
        grupoPersonagem.position.z += sinH * vel;
      }
      if (teclas['KeyD'] || teclas['ArrowRight']) {
        grupoPersonagem.position.x += cosH * vel;
        grupoPersonagem.position.z -= sinH * vel;
      }

      grupoPersonagem.position.x = Math.max(-40, Math.min(40, grupoPersonagem.position.x));
      grupoPersonagem.position.z = Math.max(-40, Math.min(40, grupoPersonagem.position.z));

      // Flutuação vertical suave e rotação contínua
      grupoPersonagem.position.y = 2.5 + Math.sin(t * 2) * 0.18;
      grupoPersonagem.rotation.y += dt * 0.55;

      // Posição da câmera em coordenadas esféricas centradas no personagem
      const { x: px, y: py, z: pz } = grupoPersonagem.position;
      const r    = camOrbit.distancia;
      const cosV = Math.cos(camOrbit.anguloV);
      camera.position.set(
        px + r * Math.sin(camOrbit.anguloH) * cosV,
        py + r * Math.sin(camOrbit.anguloV),
        pz + r * Math.cos(camOrbit.anguloH) * cosV
      );
      camera.lookAt(px, py + 0.5, pz);

      // Pulsação e flutuação dos itens (requisito acadêmico: animação no loop)
      itens.forEach((item, i) => {
        if (!item.coletado) {
          const fase = i * (Math.PI * 2 / 5);
          item.mesh.scale.setScalar(1 + Math.sin(t * 2.5 + fase) * 0.2);
          item.mesh.position.y = item.posBase.y + Math.sin(t * 1.8 + fase) * 0.4;
        }
      });

      // Detecção de colisão por proximidade (distância euclidiana 3D)
      if (totalColetados < 5) {
        itens.forEach((item, i) => {
          if (!item.coletado && grupoPersonagem.position.distanceTo(item.mesh.position) < 2.1) {
            item.coletado = true;
            criarExplosao(item.mesh.position.clone(), coresItens[i]);
            cena.remove(item.mesh);
            item.mesh.geometry.dispose();
            item.mesh.material.dispose();
            totalColetados++;
            setColetados(totalColetados);
            if (totalColetados === 5) setVitoria(true);
          }
        });
      }

      // Atualiza cada sistema de partículas ativo
      for (let i = sistemasParticulas.length - 1; i >= 0; i--) {
        const sp = sistemasParticulas[i];
        sp.vida -= dt * 1.8;

        if (sp.vida <= 0) {
          cena.remove(sp.pontos);
          sp.pontos.geometry.dispose();
          sp.pontos.material.dispose();
          sistemasParticulas.splice(i, 1);
        } else {
          const pos = sp.pontos.geometry.attributes.position.array;
          // Cada partícula segue sua velocidade e sofre gravidade leve
          sp.velocidades.forEach((v, j) => {
            v.y -= dt * 0.35;
            pos[j * 3]     += v.x;
            pos[j * 3 + 1] += v.y;
            pos[j * 3 + 2] += v.z;
          });
          sp.pontos.geometry.attributes.position.needsUpdate = true;
          sp.pontos.material.opacity = sp.vida;
        }
      }

      renderizador.render(cena, camera);
    };

    animar();

    // Redimensionamento responsivo
    const aoRedimensionar = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w > 0 && h > 0) {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderizador.setSize(w, h);
      }
    };
    window.addEventListener('resize', aoRedimensionar);

    return () => {
      cancelAnimationFrame(idFrame);
      window.removeEventListener('keydown', aoTeclarDown);
      window.removeEventListener('keyup',   aoTeclarUp);
      renderizador.domElement.removeEventListener('mousedown', aoMouseDown);
      window.removeEventListener('mousemove', aoMouseMove);
      window.removeEventListener('mouseup',   aoMouseUp);
      renderizador.domElement.removeEventListener('wheel', aoScroll);
      window.removeEventListener('resize', aoRedimensionar);
      if (container.contains(renderizador.domElement)) {
        container.removeChild(renderizador.domElement);
      }
      renderizador.dispose();
    };
  }, []);

  return (
    <div
      ref={refContainer}
      style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: '#000' }}
    >
      {/* HUD — contador de doações (requisito acadêmico) */}
      <div style={{
        position: 'absolute', top: 16, left: 16, zIndex: 10,
        background: 'rgba(60,71,77,0.88)', color: '#E8A968',
        padding: '8px 20px', borderRadius: 8,
        fontWeight: 'bold', fontSize: 16,
        fontFamily: 'Open Sans, sans-serif',
        pointerEvents: 'none',
        boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
      }}>
        {coletados} / 5 doações coletadas
      </div>

      {/* Instruções de controle */}
      <div style={{
        position: 'absolute', bottom: 20, left: 16, zIndex: 10,
        background: 'rgba(60,71,77,0.78)', color: '#F9F9F9',
        padding: '8px 14px', borderRadius: 8, fontSize: 12,
        fontFamily: 'Open Sans, sans-serif',
        pointerEvents: 'none', lineHeight: '1.9',
      }}>
        <div>WASD / setas — mover</div>
        <div>Arrastar mouse — girar câmera</div>
        <div>Scroll — zoom</div>
      </div>

      {/* Tela de vitória */}
      {vitoria && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 20,
          background: 'rgba(0,0,0,0.75)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Open Sans, sans-serif',
        }}>
          <h2 style={{
            fontSize: 38, fontWeight: 'bold',
            color: '#E8A968', marginBottom: 14,
            textShadow: '0 2px 8px rgba(0,0,0,0.5)',
          }}>
            Missao Cumprida!
          </h2>
          <p style={{ fontSize: 18, color: '#F9F9F9', marginBottom: 30 }}>
            Voce coletou todas as 5 doacoes!
          </p>
          <button
            onClick={aoFechar}
            style={{
              background: '#E8A968', color: '#3C474D', border: 'none',
              padding: '12px 38px', borderRadius: 8,
              fontSize: 17, fontWeight: 'bold', cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(0,0,0,0.35)',
              transition: 'transform 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            Voltar ao Inicio
          </button>
        </div>
      )}
    </div>
  );
}

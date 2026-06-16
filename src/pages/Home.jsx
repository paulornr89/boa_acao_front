import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import doacao from '../assets/home/caridade2.jpg';
// import slider1 from '../assets/home/slider1.jpg';
import CoracaoCena from "../components/CoracaoCena";
import slider2 from '../assets/home/slider2.jpg';
import slider3 from '../assets/home/slider3.jpg';
import slider4 from '../assets/home/slider4.jpg';
import slider5 from '../assets/home/slider5.jpg';
import { Link } from 'react-router-dom';
import SvgAnimado from "./SvgAnimado";
import SimpleParallax from "simple-parallax-js";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';  /* inclui as bolinhas para passar as imagens */
import 'swiper/css/effect-fade'; 
import 'swiper/css/navigation'; /* inclui as setas para passar as imagens */ 
import SplitText from "../components/SplitText";
import JogoFase from "../components/JogoFase";

export default function Home() {
    const { logout } = useContext(AuthContext);
    const [jogoAberto, setJogoAberto] = useState(false);

    useEffect(() => {
        logout();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <>
        <div className="flex flex-col min-h-screen">
            <header className="flex items-center justify-between bg-secundary h-20 pl-5 pr-5">  
                <SvgAnimado/>              
                {/* <img className='h-15 w-15 rounded-md bg-white' src={logo}/> */}
                <h1 className="font-bold text-white leading-tight text-xs sm:text-sm md:text-xl max-w-[150px]  
                            md:max-w-none text-shadow-lg/20">
                                 <SplitText
                                    text="Boa Ação - O destino certo para sua doação!"
                                    delay={100}
                                    duration={0.4}
                                />  
                                </h1>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setJogoAberto(true)}
                        className="bg-white text-content font-bold text-sm px-4 py-2 rounded-lg hover:bg-content hover:text-white transition shadow-md"
                    >
                        Jogar
                    </button>
                    <Link className="text-white font-bold text-lg hover:text-content text-shadow-lg" to={`/login`}>
                        Acessar
                    </Link>
                </div>
            </header>
            <div className="min-h-[150vh] overflow-hidden height-[600px]">
                <SimpleParallax scale={1.5} orientation="down" overflow={false}>
                    <img 
                        className='w-full h-[300px] object-cover object-center rounded-md text-sm md:text-lg animate-pulsando' 
                        src={doacao} 
                        alt="Doação"
                    />
                </SimpleParallax>                
            </div>
            {/* SEÇÃO 3D INTERATIVA */}
            <section className="w-full h-[600px] bg-secundar relative flex flex-col items-center justify-center">
                <div className="absolute top-10 z-10 text-center pointer-events-none">
                    <h2 className="text-3xl text-secundary font-bold text-shadow-lg">Sua Doação é o que nos move</h2>
                </div>
                
                {/* CHAMADA DO COMPONENTE 3D */}
                <CoracaoCena />
            </section>
            <section className="w-full">
                <Swiper
                    modules={[Autoplay, Pagination, EffectFade, Navigation]}
                    effect="fade"
                    loop={true} /* Garante que nunca trave ao chegar no final */
                    speed={800} /* DEIXA O FADE MUITO MAIS FLUIDO (800ms) */
                    pagination={{ clickable: true }}
                    navigation={true}
                    autoplay={{ 
                        delay: 3000,
                        disableOnInteraction: false 
                    }}
                    /* Adicionei bg-gray-100 para o fundo não ficar branco puro se a imagem não preencher tudo */
                    className="w-full h-[400px] md:h-[650px] bg-gray-100"
                >
                    {/* <SwiperSlide>
                        <img className='w-full h-full object-cover' style={{ objectPosition: 'center 35%' }} src={slider1} alt="Slide 1"/>
                    </SwiperSlide> */}
                    <SwiperSlide>
                        <img className='w-full h-full object-cover' style={{ objectPosition: 'center 65%' }} src={slider4} alt="Slide 1"/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className='w-full h-full object-cover' style={{ objectPosition: 'center 42%' }} src={slider2} alt="Slide 2"/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className='w-full h-full object-cover' style={{ objectPosition: 'center 35%' }} src={slider3} alt="Slide 3"/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className='w-full h-full object-cover' style={{ objectPosition: 'center 35%' }} src={slider5} alt="Slide 4"/>
                    </SwiperSlide>
                </Swiper>
            </section>

            <section className="py-16 px-5 text-center md:w-2/3 mx-auto text-content">
                <h2 className="text-3xl font-bold mb-4 text-secundary">Por que doar?</h2>
                <p className="text-lg">
                    Sua doação faz a diferença na vida de centenas de famílias.
                </p>
            </section>

            <section className="w-full h-[300px] overflow-hidden relative flex items-center justify-center">
                
                {/* A imagem de fundo com o efeito */}
                <div className="absolute inset-0 z-0">
                    <SimpleParallax scale={1.5} orientation="up">
                        {/* Dica: A imagem do parallax deve ser um pouco mais alta que o container (ex: 400px) */}
                        <img className="w-full h-[450px] object-cover" src={doacao} alt="Parallax"/>
                    </SimpleParallax>
                </div>

                {/* Um texto por cima do Parallax (opcional) */}
                <div className="relative z-10 bg-black/50 p-6 rounded-md text-center">
                    <h2 className="text-white text-2xl font-bold mb-2">Faça parte dessa corrente</h2>
                    <Link to="/cadastro" className="bg-secundary text-white px-6 py-2 rounded-md font-bold hover:scale-105 transition">
                        Cadastre-se Agora
                    </Link>
                </div>
            </section>
            <footer className="bg-secundary h-20 flex items-center justify-center margin-top-auto">
                <p className="text-white text-sm md:text-lg text-shadow-lg">© 2026 Boa Ação. Todos os direitos reservados.</p>
            </footer>
        </div>
        {jogoAberto && (
            <div style={{
                position: 'fixed', inset: 0, zIndex: 9999,
                background: '#000',
            }}>
                <button
                    onClick={() => setJogoAberto(false)}
                    style={{
                        position: 'absolute', top: 16, right: 16, zIndex: 10000,
                        background: '#EB6767', color: '#fff', border: 'none',
                        padding: '8px 18px', borderRadius: 8,
                        fontWeight: 'bold', cursor: 'pointer', fontSize: 15,
                        fontFamily: 'Open Sans, sans-serif',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
                    }}
                >
                    X Fechar
                </button>
                <JogoFase aoFechar={() => setJogoAberto(false)} />
            </div>
        )}
    </>
}
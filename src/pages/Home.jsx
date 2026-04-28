import { useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import doacao from '../assets/home/caridade2.jpg';
import { Link } from 'react-router-dom';
import SvgAnimado from "./SvgAnimado";
import SimpleParallax from "simple-parallax-js";

export default function Home() {
    const { logout } = useContext(AuthContext);

    useEffect(() => {
        logout();
    }, []);

    return <>
        <div className="flex flex-col min-h-screen">
            <header className="flex items-center justify-between bg-secundary h-20 pl-5 pr-5">  
                <SvgAnimado/>              
                {/* <img className='h-15 w-15 rounded-md bg-white' src={logo}/> */}
                <h1 className="font-bold text-white leading-tight
                            text-xs           /* Celular: Texto bem pequeno */
                            sm:text-sm        /* Tablet pequeno: Um pouco maior */
                            md:text-xl        /* PC/Tablet: Texto grande */
                            max-w-[150px]     /* Limita largura no celular para quebrar linha se precisar */
                            md:max-w-none text-shadow-lg/20">Boa Ação - O destino certo para sua doação!</h1>
                <Link className="text-white font-bold text-lg hover:text-content text-shadow-lg" to={`/login`}>
                    Acessar
                </Link>
            </header>
            <div className="min-h-[150vh] overflow-hidden height-[600px]">
                <SimpleParallax scale={1.7} orientation="top">
                    <img 
                        className='w-full h-[300px] object-cover object-center rounded-md text-sm md:text-lg animate-pulsando' 
                        src={doacao} 
                        alt="Doação"
                    />
                </SimpleParallax>                
            </div>
            <footer className="bg-secundary h-20 flex items-center justify-center margin-top-auto">
                <p className="text-white text-sm md:text-lg text-shadow-lg">© 2026 Boa Ação. Todos os direitos reservados.</p>
            </footer>
        </div>
    </>
}
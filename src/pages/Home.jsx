import { use, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import logo from '../assets/logo/logo01.svg';
import doacao from '../assets/home/caridade2.jpg';
import { useNavigate, Link } from 'react-router-dom';



export default function Home() {
    const { logout } = useContext(AuthContext);

    useEffect(() => {
        logout();
    }, []);

    return <>
        <header className="flex items-center justify-between bg-secundary h-20 pl-5 pr-5">                
            {/* <img className='h-15 w-15 rounded-md bg-white' src={logo}/> */}
            <h1 className="font-bold text-white leading-tight
                        text-xs           /* Celular: Texto bem pequeno */
                        sm:text-sm        /* Tablet pequeno: Um pouco maior */
                        md:text-xl        /* PC/Tablet: Texto grande */
                        max-w-[150px]     /* Limita largura no celular para quebrar linha se precisar */
                        md:max-w-none font-bold text-shadow-lg/20">Boa Ação - O destino certo para sua doação!</h1>
            <Link className="text-white font-bold text-lg hover:text-content text-shadow-lg" to={`/login`}>
                Acessar
            </Link>
        </header>
        <div>
            <img 
                className='w-full h-[400px] object-cover object-center rounded-md text-sm md:text-lg' 
                src={doacao} 
                alt="Doação"
            />
            
        </div>
    </>
}
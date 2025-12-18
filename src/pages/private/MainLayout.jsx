import user from '../../assets/user-default.webp';
import logo from '../../assets/logo/logo01.svg';
import { Outlet, Link } from 'react-router-dom';
import { useState } from 'react';

export default function MainLayout() {
    const [menuAberto, setMenuAberto] = useState(false);

    const fecharMenu = () => setMenuAberto(false);

    return <>
        <header className="flex items-center justify-between bg-secundary h-20 pl-5 pr-5">
            <button onClick={() => setMenuAberto(true)} className="text-white text-3xl flex justify-center items-center focus:outline-none border p-0.5 w-10 h-10 rounded-md border-white cursor-pointer 
            transition-transform duration-300 hover:scale-110">
                &#9776; 
            </button>
            <img className='h-15 w-15 rounded-md bg-white' src={logo}/>
            <img className='h-10 w-10 rounded-full border border-white bg-white transition-transform duration-300 hover:scale-110 cursor-pointer ' src={user}/>
        </header>
        {
            menuAberto && (
                <>
                    <div className="fixed inset-0  bg-opacity-50 z-30" 
                        onClick={fecharMenu}
                    ></div>
                    <aside className="fixed inset-y-0 left-0 w-64 bg-primary shadow-xl z-40 flex flex-col p-4 transition-transform duration-300 border border-r-4 border-white">

                    {/* Links de Navegação */}
                    <nav className="flex flex-col gap-4">
                        <Link to="/doadores" onClick={fecharMenu} className="p-2 hover:bg-white rounded font-medium">
                            Doadores
                        </Link>
                        <Link to="/itens" onClick={fecharMenu} className="p-2 hover:bg-white rounded font-medium">
                            Itens
                        </Link>
                        <Link to="/categorias" onClick={fecharMenu} className="p-2 hover:bg-white rounded font-medium">
                            Categorias
                        </Link>
                        <Link to="/perfil" onClick={fecharMenu} className="p-2 hover:bg-white rounded font-medium">
                            Editar Perfil
                        </Link>
                        
                        {/* Botão Sair */}
                        <Link to="/login" onClick={fecharMenu} className="mt-4 p-2 bg-white rounded hover:bg-secundary font-medium text-center">
                            Sair
                        </Link>
                    </nav>
                </aside>
                </>
            )
        }
        <main className="p-4">
            <Outlet />
        </main>
    </>
}
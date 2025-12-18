import axiosClient from '../../utils/axios-client.js';
import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
import CardCategoria from './CardCategoria.jsx';

export default function Categoria({ categoria }) {
    const [categorias, setCategorias] = useState([]);
    const { isAdmin } = useContext(AuthContext);
    const navigate = useNavigate();

    const listaDeCategorias = async () => {
        try {
            const { data } = await axiosClient.get('/categorias');
            setCategorias(data.data);
        } catch (error) {
            console.error("Erro ao buscar categorias:", error);
        }
    }

    useEffect(() => {
        listaDeCategorias();
    }, []);

    return <div className='flex flex-col w-200 items-center'>
        <div className='flex justify-end w-200'>
            <button className='bg-content text-white h-15 w-50 rounded-md font-bold cursor-pointer shadow-[1px_1px_5px_rgba(0,0,0,0.3)] transition-transform m-2
            duration-300 hover:scale-103' 
            onClick={()=> {navigate('/categorias/cadastro')}}>Nova Categoria</button>
        </div> 
        <ul className='flex flex-col w-70'>
            {categorias.length > 0 ?
            categorias.map(categoria => (
                isAdmin ?
                <Link key={categoria.id} to={`/categorias/${categoria.id}`}>                        
                    <CardCategoria categoria={categoria} />
                </Link>
                :
                <CardCategoria categoria={categoria} />
            ))
            :
            <p>Nenhuma categoria encontrado.</p>
            }
        </ul>
    </div>;
}
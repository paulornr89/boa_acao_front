import axiosClient from '../../utils/axios-client.js';
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
import CardCategoria from './CardCategoria.jsx';

export default function Categoria({ categoria }) {
    const [categorias, setCategorias] = useState([]);
    const { isAdmin } = useContext(AuthContext);

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

    return (
            <ul className='flex flex-col'>
                {categorias.map(categoria => (
                    isAdmin ?
                    <Link key={categoria.id} to={`/categorias/${categoria.id}`}>                        
                        <CardCategoria categoria={categoria} />
                    </Link>
                    :
                    <CardCategoria categoria={categoria} />
                ))}
            </ul>
    );
}
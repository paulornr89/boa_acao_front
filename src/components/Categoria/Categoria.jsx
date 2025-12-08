import axiosClient from '../../utils/axios-client.js';
import { useState, useEffect } from 'react';

export default function Categoria({ categoria }) {
    const [categorias, setCategorias] = useState([]);

    const listaDeCategorias = async () => {
        try {
            const { data } = await axiosClient.get('/categorias');
            console.log(data);
            setCategorias(data.data);
            console.log(categorias);
        } catch (error) {
            console.error("Erro ao buscar categorias:", error);
        }
    }

    useEffect(() => {
        listaDeCategorias();
    }, []);

    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold mb-4">Categorias</h1>
            <ul>
                {categorias.map(cat => (
                    <li key={cat.id} className="border p-2 my-2 rounded shadow-sm">
                        {cat.sigla} - {cat.nome}
                    </li>
                ))}
            </ul>
        </div>
    );
}
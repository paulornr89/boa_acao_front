import { useContext, useRef, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import FieldInput from '../Fields/FieldInput.jsx';
import salvar from '../../assets/salvar.png';
import axiosClient from '../../utils/axios-client.js';
const API_URL = import.meta.env.VITE_API_URL;

export default function NewCategoria() {  
    const { isAdmin, isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();
    const nomeRef = useRef();
    const siglaoRef = useRef();

    async function storeCategoria(dataCategoria) {
        const response = await axiosClient.post(`${API_URL}/categorias`, dataCategoria)
        .then(response => response.data)
        .catch(error => console.error('Error:', error));

        return response;
    }

    return <form className='w-130 bg-primary flex gap-2 justify-around flex-col p-5 rounded-md shadow-[1px_1px_5px_rgba(0,0,0,0.3)] transition-transform'>
            <h1 className='text-2xl font-bold text-center'>Cadastrar Categoria</h1>
            { isAdmin && isAuthenticated &&
                <>
                    <FieldInput text="Nome" type="text" id="nome" ref={nomeRef}/>
                    <FieldInput text="Sigla" type="text" id="sigla" ref={siglaoRef}/>
                </>                             
           }
           <button onClick={async (e)=>{
                try {
                    e.preventDefault();
                    const resStore = await storeCategoria({
                        nome: nomeRef.current.value,
                        sigla: siglaoRef.current.value,
                    });
                    console.log(resStore)
                    navigate('/categorias');
                }catch(e) {
                    console.error(e);
                    throw e;
                }
                }} 
                className='bg-secundary self-end transition-transform duration-200 hover:scale-115 rounded-md w-15 h-15 flex justify-center items-center border'>
                <img className='w-7.5 h-7.5' src={salvar}/></button>
        </form>;
}
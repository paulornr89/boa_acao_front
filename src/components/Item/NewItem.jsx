import { useState, useContext, use, useRef, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ItemContext } from '../../context/ItemContext.jsx';
import { useNavigate } from 'react-router-dom';
import FieldInput from '../Fields/FieldInput.jsx';
import FieldSelect from '../Fields/FieldSelect.jsx';
import salvar from '../../assets/salvar.png';
import axiosClient from '../../utils/axios-client.js';

export default function NewItem() {  
    const { isAdmin, isAuthenticated } = useContext(AuthContext);
    const { store } = useContext(ItemContext);
    const [categorias, setCategorias] = useState([]);
    const navigate = useNavigate();
    const nomeRef = useRef();
    const descricaoRef = useRef();
    const unidadeRef = useRef();
    const categoriaRef = useRef();

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

    return <form className='w-130 bg-primary flex gap-2 justify-around flex-col p-5 rounded-md shadow-[1px_1px_5px_rgba(0,0,0,0.3)] transition-transform'>
            <h1 className='text-2xl font-bold text-center'>Cadastrar ITem</h1>
            { isAdmin && isAuthenticated &&
                <>
                    <FieldInput text="Nome" type="text" id="nome" ref={nomeRef}/>
                    <FieldInput text="Descrição" type="text" id="descricao" ref={descricaoRef}/>
                    <FieldInput text="Unidade" type="text" id="unidade" ref={unidadeRef}/>  
                    <FieldSelect id="categoria" label="Categorias:" options={[
                        {value: '', label: 'Selecione uma opção...'},
                        ...categorias.map(categoria => ({value: categoria.id, label: `${categoria.nome}`}))                        
                    ]} ref={categoriaRef}/>
                </>                             
           }
           <button onClick={async (e)=>{
                try {
                    e.preventDefault();
                    const resStore = await store({
                        nome: nomeRef.current.value,
                        unidade: unidadeRef.current.value,
                        descricao: descricaoRef.current.value,
                        categoria_id: categoriaRef.current.value 
                    });
                    navigate('/itens');
                }catch(e) {
                    console.error(e);
                    throw e;
                }
                }} 
                className='bg-secundary self-end transition-transform duration-200 hover:scale-115 rounded-md w-15 h-15 flex justify-center items-center border'>
                <img className='w-7.5 h-7.5' src={salvar}/></button>
        </form>;
}
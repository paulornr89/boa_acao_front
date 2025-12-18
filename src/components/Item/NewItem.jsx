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
    const imagemRef = useRef();

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
            <h1 className='text-2xl font-bold text-center'>Cadastrar Item</h1>
            { isAdmin && isAuthenticated &&
                <>
                    <FieldInput text="Nome" type="text" id="nome" ref={nomeRef}/>
                    <FieldInput text="Descrição" type="text" id="descricao" ref={descricaoRef}/>
                    <FieldInput text="Unidade" type="text" id="unidade" ref={unidadeRef}/>  
                    <FieldSelect id="categoria" label="Categorias:" options={[
                        {value: '', label: 'Selecione uma opção...'},
                        ...categorias.map(categoria => ({value: categoria.id, label: `${categoria.nome}`}))                        
                    ]} ref={categoriaRef}/>
                    {/* 2. Campo de Upload de Imagem */}
                    <div className="flex flex-col gap-1  w-90">
                        <label htmlFor="imagem" className="font-bold">Imagem:</label>
                        <input 
                            type="file" 
                            id="imagem" 
                            ref={imagemRef} 
                            accept="image/*"
                            className="bg-secundary p-2 rounded-md transition-transform duration-200 hover:scale-105 border cursor-pointer"
                        />
                    </div>
                </>                             
           }
           <button onClick={async (e)=>{
                    try {
                        e.preventDefault();
                        console.log("cadastro de novos itens")
                        // 3. CRIAÇÃO DO FORMDATA (Crucial para envio de arquivos)
                        const formData = new FormData();
                        formData.append('nome', nomeRef.current.value);
                        formData.append('descricao', descricaoRef.current.value);
                        formData.append('unidade', unidadeRef.current.value);
                        formData.append('categoria_id', categoriaRef.current.value);

                        // Verifica se o usuário selecionou um arquivo
                        if (imagemRef.current.files[0]) {
                            formData.append('imagem', imagemRef.current.files[0]);
                        }

                        // Envia o formData diretamente. 
                        // Nota: O seu ItemContext/store deve passar isso direto para o axios.post
                        const response = await store(formData);
                        console.log(response)
                        navigate('/itens');
                    }catch(e) {
                        console.error(e);
                        throw e;
                    }
                }} 
                className='bg-secundary self-end transition-transform duration-200 hover:scale-115 rounded-md w-15 h-15 flex justify-center items-center border cursor-pointer'>
                <img className='w-7.5 h-7.5' src={salvar}/></button>
        </form>;
}
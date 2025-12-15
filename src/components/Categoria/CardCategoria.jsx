import { useParams, useNavigate } from "react-router-dom";
import axiosClient from '../../utils/axios-client.js';
import { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import excluir from '../../assets/excluir.png';
import editar from '../../assets/editar.png';
import salvar from '../../assets/salvar.png';
import Input from '../Fields/Input.jsx';
const API_URL = import.meta.env.VITE_API_URL;

export default function CardCategoria( {categoria: propsCategoria}) {
    const { id } = useParams();
    const [categoria, setCategoria] = useState(propsCategoria);
    const [editarCategoria, setEditarCategoria] = useState(false);
    const { isAdmin } = useContext(AuthContext);
    const navigate = useNavigate();
    const nomeRef = useRef();
    const siglaRef = useRef();

    useEffect(() => {
        const searchCategoria = async () => {
            if(!categoria) {
                const responseCategoria = await getCategoriaById(id);
    
                responseCategoria && setCategoria(responseCategoria);
            } 
        }

        searchCategoria();
    }, [id]);

    async function getCategoriaById() {
        try {
            const categoria = await axiosClient.get(`${API_URL}/categorias/${id}`)
            .then(response => response.data)
            .then(data => data.data)
            .catch(error => console.error('Error:', error));

            return categoria;
        } catch (error) {
            console.error("Erro ao buscar categoria:", error);
        }
    }

    async function updateCategoria(dataCategoria) {
        const response = await axiosClient.put(`${API_URL}/categorias/${id}`, dataCategoria)
        .then(response => response.data)
        .catch(error => console.error('Error:', error));

        return response;
    }

    async function deleteCategoria() {
        const response = await axiosClient.delete(`${API_URL}/categorias/${id}`)
        .then(response => response.data)
        .catch(error => console.error('Error:', error));

        console.log(response)

        return response;
    }

    return <div>
        { categoria ? 
            <li  className="border p-2 my-2 gap-2 items-center flex justify-between rounded shadow-sm transition-transform duration-300 hover:scale-103 list-none">
                { !editarCategoria ? 
                    <span>{categoria.sigla} - {categoria.nome}</span> 
                    :   
                    <form className="flex gap-2">
                        <Input text="Nome" type="text" id="nome" defaultValue={categoria.nome} ref={nomeRef}/>
                        <Input text="Sigla" type="text" id="sigla" defaultValue={categoria.sigla} ref={siglaRef}/>
                    </form>             
                }
                <div className="flex gap-2">
                    { !editarCategoria && isAdmin && id &&
                        <button onClick={()=>{setEditarCategoria(true)}} className='bg-secundary transition-transform duration-200 hover:scale-115 rounded-md w-10 h-10 flex justify-center items-center border'>
                            <img className='w-7.5 h-7.5' src={editar}/></button>                  
                    }
                    { editarCategoria && isAdmin && id &&
                        <button onClick={async ()=>{
                                try {
                                    const resUpdate = await updateCategoria({
                                        nome: nomeRef.current.value,
                                        sigla: siglaRef.current.value,
                                    });
                                    console.log(resUpdate);
                                    navigate('/categorias');
                                    //setEditarItem(false);
                                }catch(e) {
                                    console.error(e);
                                }
                            }} 
                            className='bg-secundary transition-transform duration-200 hover:scale-115 rounded-md w-10 h-10 flex justify-center items-center border'>
                            <img className='w-7.5 h-7.5' src={salvar}/></button>
                    }  
                    { !editarCategoria && isAdmin && id &&
                        <button 
                            onClick={async ()=>{
                                console.log('Categoria removida');
                                await deleteCategoria(); 
                                //incluir mensagem visível de item removido com sucesso
                                //navigate('/categorias');
                            }}
                            className='bg-secundary transition-transform duration-200 hover:scale-115 rounded-md w-10 h-10 flex justify-center items-center border'>
                                <img className='w-7.5 h-7.5' src={excluir}/>
                        </button>
                    } 
                </div>
            </li>
            : 
            <h2>Nenhuma categoria encontrada.</h2> }
    </div>;
}
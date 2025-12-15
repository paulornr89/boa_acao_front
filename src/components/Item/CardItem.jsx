import itensDefault from '../../assets/balde.png';
import editar from '../../assets/editar.png';
import excluir from '../../assets/excluir.png';
import salvar from '../../assets/salvar.png';
import { useState, useContext, use, useRef, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ItemContext } from '../../context/ItemContext.jsx';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import Input from '../Fields/Input.jsx';


export default function CardItem({item}) {
    const [ editarItem, setEditarItem ] = useState(false);
    const { isAdmin, isAuthenticated } = useContext(AuthContext);
    const { update, remove } = useContext(ItemContext);
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const nomeRef = useRef();
    const unidadeRef = useRef();
    const descricaoRef = useRef();
    const temImagem = item.media && item.media.length > 0;
    const imagemSrc = temImagem ? item.media[0].source : itensDefault;
    
    useEffect(() => {}, [editarItem]);

    return  <div className='w-130 bg-primary flex gap-2 justify-around flex-col h-90 p-5 rounded-md shadow-[1px_1px_5px_rgba(0,0,0,0.3)] transition-transform 
            duration-300 hover:scale-103"'>
                <div className=' flex justify-around'>
                    <img 
                        className="w-32 h-32 object-cover rounded-md border-2" 
                        src={imagemSrc}
                        alt={item.nome}
                        onError={(e) => { e.target.src = itensDefault; }} // Fallback de segurança se a imagem quebrar
                    />
                    <div className='w-80 flex flex-col justify-center text-center text-xl'>
                        {
                            editarItem ?
                            <form>
                                <p>ID: {item.id}</p>
                                <div className='flex items-center gap-2 justify-between'>
                                    <label>Nome:</label>
                                    <Input text="Nome" type="text" id="nome" defaultValue={item.nome} ref={nomeRef}/>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <label>Descrição:</label>
                                    <Input type="text" id="descricao" defaultValue={item.descricao} ref={descricaoRef}/>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <label>Unidade:</label>
                                    <Input type="text" id="unidade" defaultValue={item.unidade} ref={unidadeRef}/>
                                </div>                                
                                {/* <FieldInput text="Categ" type="text" value={item.categoria_id}/> */}
                            </form>
                            :
                            <>
                                <h3 className='font-bold'>{item.nome}</h3>
                                <p>ID: {item.id}</p>
                                <p>Descrição: {item.descricao}</p>
                                <p>Unidade: {item.unidade}</p>
                            </>
                        }
                    </div>
                </div>
                { isAdmin && isAuthenticated && !location.pathname.includes('public') && id &&
                    <div className='flex justify-around h-20 items-center'>
                        { editarItem &&
                            <button onClick={async ()=>{
                                try {
                                    const resUpdate = await update(id, {
                                        nome: nomeRef.current.value,
                                        unidade: unidadeRef.current.value,
                                        descricao: descricaoRef.current.value
                                    });
                                    console.log(resUpdate);
                                    navigate('/itens');
                                    //setEditarItem(false);
                                }catch(e) {
                                    console.error(e);
                                }
                                }} 
                                className='bg-secundary transition-transform duration-200 hover:scale-115 rounded-md w-15 h-15 flex justify-center items-center border'>
                                <img className='w-7.5 h-7.5' src={salvar}/></button>
                        }                
                        { !editarItem &&
                            <button onClick={()=>{setEditarItem(true)}} className='bg-secundary transition-transform duration-200 hover:scale-115 rounded-md w-15 h-15 flex justify-center items-center border'>
                                <img className='w-7.5 h-7.5' src={editar}/></button>                  
                        }                
                        <button 
                            onClick={async ()=>{
                                await remove(id); 
                                //incluir mensagem visível de item removido com sucesso
                                navigate('/itens');
                            }}
                            className='bg-secundary transition-transform duration-200 hover:scale-115 rounded-md w-15 h-15 flex justify-center items-center border'>
                                <img className='w-7.5 h-7.5' src={excluir}/></button>
                    </div>
                }
            </div>;
}
import perfil from '../../assets/user-default.webp';
import editar from '../../assets/editar.png';
import excluir from '../../assets/excluir.png';
import salvar from '../../assets/salvar.png';
import { useState, useContext, use, useRef, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { DoadorContext } from '../../context/DoadorContext.jsx';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import Input from '../Fields/Input.jsx';


export default function CardDoador({doador}) {
    const [ editarDoador, setEditarDoador ] = useState(false);
    const { isAdmin, isAuthenticated } = useContext(AuthContext);
    const { update, remove } = useContext(DoadorContext);
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const nomeRef = useRef();
    const telefoneRef = useRef();
    const enderecoRef = useRef();
    const cidadeRef = useRef();
    const estadoRef = useRef();
    const cepRef = useRef();
    
    return <div className="w-150 bg-primary flex flex-col gap-2 p-5 rounded-md shadow-[1px_1px_5px_rgba(0,0,0,0.3)] transition-transform 
    duration-300 hover:scale-103">
        <div className=' flex justify-around'>
            <img className="w-30 self-center" src={perfil}/>
            <div className="w-90 self-center">
                { editarDoador ?
                    <form>
                        <p>ID: {doador.id}</p>
                        <div className='flex items-center gap-2 justify-between'>
                            <label>Nome:</label>
                            <Input text="Nome" type="text" id="nome" defaultValue={doador.nome} ref={nomeRef}/>
                        </div>
                        <div className='flex items-center gap-2 justify-between'>
                            <label>Telefone:</label>
                            <Input type="text" id="telefone" defaultValue={doador.telefone} ref={telefoneRef}/>
                        </div>
                        <div className='flex items-center gap-2 justify-between'>
                            <label>Endereço:</label>
                            <Input type="text" id="endereco" defaultValue={doador.endereco} ref={enderecoRef}/>
                        </div>                                
                        <div className='flex items-center gap-2 justify-between'>
                            <label>Cidade:</label>
                            <Input type="text" id="cidade" defaultValue={doador.cidade} ref={cidadeRef}/>
                        </div>                                
                        <div className='flex items-center gap-2 justify-between'>
                            <label>Estado:</label>
                            <Input type="text" id="estado" defaultValue={doador.estado} ref={estadoRef}/>
                        </div>                                
                        <div className='flex items-center gap-2 justify-between'>
                            <label>CEP:</label>
                            <Input type="text" id="cep" defaultValue={doador.cep} ref={cepRef}/>
                        </div>                                
                        {/* <FieldInput text="Categ" type="text" value={item.categoria_id}/> */}
                    </form>
                :
                    <>
                        <p>ID: <span>{doador.id}</span></p>
                        <p>User-ID: <span>{doador.user_id}</span></p>
                        <p>Nome: <span>{doador.nome}</span></p>
                        <p>Telefone: <span>{doador.telefone}</span></p>
                        <p>Endereço: <span>{doador.endereco}</span></p>
                        <p>Cidade: <span>{doador.cidade}</span></p>
                        <p>Estado: <span>{doador.estado}</span></p>
                        <p>CEP: <span>{doador.cep}</span></p>
                    </>
                }
            </div>
        </div>
        { isAdmin && isAuthenticated && id &&
            <div className='flex justify-around h-20 items-center'>
                { editarDoador &&
                    <button onClick={async ()=>{
                        try {
                            const resUpdate = await update(id, {
                                nome: nomeRef.current.value,
                                telefone: telefoneRef.current.value,
                                endereco: enderecoRef.current.value,
                                cidade: cidadeRef.current.value,
                                estado: estadoRef.current.value,
                                cep: cepRef.current.value
                            });
                            console.log(resUpdate);
                            navigate('/doadores');
                            //setEditarItem(false);
                        }catch(e) {
                            console.error(e);
                        }
                        }} 
                        className='bg-secundary transition-transform duration-200 hover:scale-115 rounded-md w-15 h-15 flex justify-center items-center border'>
                        <img className='w-7.5 h-7.5' src={salvar}/></button>
                }                
                { !editarDoador &&
                    <button onClick={()=>{setEditarDoador(true)}} className='bg-secundary transition-transform duration-200 hover:scale-115 rounded-md w-15 h-15 flex justify-center items-center border'>
                        <img className='w-7.5 h-7.5' src={editar}/></button>                  
                }                
                <button 
                    onClick={async ()=>{
                        console.log('Doador removido');
                        await remove(doador.user_id); 
                        //incluir mensagem visível de item removido com sucesso
                        navigate('/doadores');
                    }}
                    className='bg-secundary transition-transform duration-200 hover:scale-115 rounded-md w-15 h-15 flex justify-center items-center border'>
                        <img className='w-7.5 h-7.5' src={excluir}/></button>
            </div>
        }
    </div>
}
import itens from '../../assets/balde.png';
import editar from '../../assets/editar.png';
import excluir from '../../assets/excluir.png';
import salvar from '../../assets/salvar.png';
import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useLocation } from 'react-router-dom';

export default function CardItem({item}) {
    const [ editarItem, setEditarItem ] = useState(false);
    const { isAdmin, isAuthenticated } = useContext(AuthContext);
    const location = useLocation();

    return <div className='w-80 bg-primary flex gap-2 justify-around flex-col h-50 rounded-md shadow-[1px_1px_5px_rgba(0,0,0,0.3)] transition-transform 
            duration-300 hover:scale-103"'>
            <div className=' flex justify-around'>
                <img className="w-25 h-25 self-center" src={itens}/>
                <div className='w-40 h-25 self-center text-center'>
                    <h3 className='font-bold'>{item.nome}</h3>
                    <p>ID: {item.id}</p>
                    <p>Unidade: {item.unidade}</p>
                    <p>Categoria: {item.categoria_id}</p>
                </div>
            </div>
            { isAdmin && isAuthenticated && !location.pathname.includes('public') &&
                <div className='flex justify-around h-10'>
                    { editarItem &&
                        <button className='bg-secundary transition-transform duration-200 hover:scale-115 rounded-md w-10 flex justify-center items-center border'>
                            <img className='w-7.5 h-7.5' src={salvar}/></button>
                    }                
                    { !editarItem &&
                        <button onClick={()=>{}} className='bg-secundary transition-transform duration-200 hover:scale-115 rounded-md w-10 flex justify-center items-center border'>
                            <img className='w-7.5 h-7.5' src={editar}/></button>                  
                    }                
                    <button className='bg-secundary transition-transform duration-200 hover:scale-115 rounded-md w-10 flex justify-center items-center border'><img className='w-7.5 h-7.5' src={excluir}/></button>
                </div>
            }
    </div> 
}
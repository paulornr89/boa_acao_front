import CardItem from './CardItem';
import { useContext, useEffect, useState } from 'react';
import { ItemContext } from '../../context/ItemContext';
import { Link, useNavigate } from 'react-router-dom';

export default function ListaDeItens() {
    const [itens, setItens] = useState([]);
    const { getAllItems } = useContext(ItemContext);
    const navigate = useNavigate();


    useEffect(() => {
        const dados = async () => {
            const resposta = await getAllItems();

            if(resposta.data) {
                setItens(resposta.data);
            }
        }
        dados();
    }, []);

    return <div>
        <div className='flex justify-end'>
                    <button className='bg-content text-white h-15 w-50 rounded-md font-bold cursor-pointer shadow-[1px_1px_5px_rgba(0,0,0,0.3)] transition-transform m-2
                    duration-300 hover:scale-103' 
                    onClick={()=> {navigate('/itens/cadastro')}}>Novo Item</button>
        </div>
        <div className="flex flex-row gap-4 flex-wrap justify-center">
            {
                itens.length > 0 ? itens.map((item) => {
                            return (
                                <Link key={item.id} to={`/itens/${item.id}`}>
                                    <CardItem item={item}/>
                                </Link>
                            );
                        })
                : (<p>Nenhum item encontrado.</p>)
            }
        </div>
    </div>
}
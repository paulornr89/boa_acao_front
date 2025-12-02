import CardItem from './CardItem';
import { useContext, useEffect, useState } from 'react';
import { ItemContext } from '../../context/ItemContext';

export default function ListaDeItens() {
    const [itens, setItens] = useState([]);
    const { getAllItems } = useContext(ItemContext);

    useEffect(() => {
        const dados = async () => {
            const resposta = await getAllItems();

            if(resposta.data) {
                setItens(resposta.data);
            }
        }
        dados();
    }, []);

    return <>
        {
            itens.length > 0 ? itens.map((item) => {
                        return <CardItem key={item.id} item={item}/>
                    })
            : (<p>Nenhum item encontrado.</p>)
        }
    </>
}
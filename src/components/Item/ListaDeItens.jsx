import CardItem from './CardItem';
import { useContext } from 'react';
import { ItemContext } from '../../context/ItemContext';

export default function ListaDeItens() {
    const { getAllItems } = useContext(ItemContext);
    const itens = getAllItems();

    return <>
        {
            itens.length > 0 ? itens.map((item) => {
                        return <CardItem key={item.id} item={item}/>
                    })
            : (<p>Nenhum item encontrado.</p>)
        }
    </>
}
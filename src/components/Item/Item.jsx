
import { useContext } from 'react';
import CardItem from './CardItem';
import { ItemContext } from '../../context/ItemContext';
import { useParams } from 'react-router-dom';

export default function Item() {
    const { id } = useParams();
    const { getItem } = useContext(ItemContext);
    const itemEncontrado = getItem(id);
    console.log(itemEncontrado);
    return <>            
            { itemEncontrado ? <CardItem item={itemEncontrado}/> : <p>Item não encontrado.</p> }
        </>
}
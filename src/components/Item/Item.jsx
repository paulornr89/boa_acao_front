
import { use, useContext, useState, useEffect } from 'react';
import CardItem from './CardItem';
import { ItemContext } from '../../context/ItemContext';
import { useParams } from 'react-router-dom';

export default function Item() {
    const [item, setITem] = useState(null);
    const { id } = useParams();
    const { getItem } = useContext(ItemContext);

    useEffect(() => {
       handleItem();        
    }, []);

    async function handleItem() {
        const itemEncontrado = await getItem(id);

        console.log(itemEncontrado)
        if(itemEncontrado) {
            setITem(itemEncontrado);
        }
    }
    
    return <>            
            { item ? <CardItem item={item}/> : <p>Item não encontrado.</p> }
        </>
}
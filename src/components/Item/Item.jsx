import { useParams } from 'react-router-dom';
import mockItens from '../../data/itens.json';
import CardItem from './CardItem';

export default function Item() {
    let { id } = useParams();

    const itemEncontrado = mockItens.find(item => item.id === parseInt(id));

    if(!itemEncontrado) {
        return <p>Item não encontrado.</p>
    }
    return <>            
            <CardItem item={itemEncontrado}/>;
        </>
}
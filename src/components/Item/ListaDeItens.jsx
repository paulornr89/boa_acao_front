import CardItem from './CardItem';
import mockItens from '../../data/itens.json';

export default function ListaDeItens() {
    return <>
        {
            mockItens.length > 0 ? mockItens.map((item) => {
                        return <CardItem key={item.id} item={item}/>
                    })
            : (<p>Nenhum item encontrado.</p>)
        }
    </>
}
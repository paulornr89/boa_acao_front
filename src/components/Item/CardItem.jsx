import itens from '../../assets/balde.png';

export default function CardItem({item}) {
    console.log(item)
    return <div className="item">
        <img className="item-img" src={itens}/>
        <div className='item-content'>
            <h3>{item.descricao}</h3>
            <p>ID: {item.id}</p>
            <p>Unidade: {item.unidade}</p>
            <p>Tipo: {item.tipo}</p>
        </div>
    </div>
}
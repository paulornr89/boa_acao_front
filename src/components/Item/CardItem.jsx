export default function CardItem({item}) {
    console.log(item)
    return <div className="item">
        <h3>{item.descricao}</h3>
        <p>ID: {item.id}</p>
        <p>Unidade: {item.unidade}</p>
        <p>Tipo: {item.tipo}</p>
    </div>
}
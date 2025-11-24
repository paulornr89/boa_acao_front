import itens from '../../assets/balde.png';

export default function CardItem({item}) {
    return <div className="w-80 bg-primary flex gap-2 h-35 rounded-md shadow-[1px_1px_5px_rgba(0,0,0,0.3)] transition-transform 
    duration-300 hover:scale-103">
        <img className="w-30 self-center" src={itens}/>
        <div className='w-60 self-center'>
            <h3 className='font-bold'>{item.descricao}</h3>
            <p>ID: {item.id}</p>
            <p>Unidade: {item.unidade}</p>
            <p>Tipo: {item.tipo}</p>
        </div>
    </div>
}
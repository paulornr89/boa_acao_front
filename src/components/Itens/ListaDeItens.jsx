import './Itens.css';
import { useParams } from 'react-router-dom';
import mockItens from '../../data/itens.json';
import Item from './Item';

export default function ListaDeItens() {
    let { id } = useParams();
    let itensParaRenderizar = [];

    if(id) {
        const itemEncontrado = mockItens.find(item => item.id === parseInt(id));
        itensParaRenderizar = [itemEncontrado];
    }else {
        itensParaRenderizar = mockItens;
    }

    return <div className="mostrarItens">
            <div className="titulo">
                <h2 className="titulo-texto">Itens</h2>
            </div>
            <div className="listaItens">
                {
                    itensParaRenderizar.length > 0 ? itensParaRenderizar.map((item) => {
                        return <Item key={item.id} item={item}/>
                    }
                ) : (<p>Nenhum item encontrado.</p>)
                }
            </div>
        </div>;
}


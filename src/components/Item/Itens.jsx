import './Itens.css';
import { Outlet } from 'react-router-dom';

export default function Itens() {   

    return <div className="mostrarItens">
            <div className="titulo">
                <h2 className="titulo-texto">Itens</h2>
            </div>
            <div className="lista-itens">
                <Outlet/>
            </div>
        </div>;
}


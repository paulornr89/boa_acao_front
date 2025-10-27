import { useParams } from 'react-router-dom';
import CardDoador from './CardDoador';
import mockDoadores from '../../data/doadores.json';

export default function Doador() {
    let { id } = useParams();
    let doador = mockDoadores.find(doador_ => doador_.id === id);
    
    return <>
        <CardDoador doador={doador}/>
    </>
}
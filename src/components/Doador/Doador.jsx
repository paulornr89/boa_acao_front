import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { DoadorContext } from '../../context/DoadorContext';
import CardDoador from './CardDoador';


export default function Doador() {
    const { id } = useParams();
    const { getDoador } = useContext(DoadorContext);
    const doadorEncontrado = getDoador(id);
    console.log(doadorEncontrado)
    return <>
        {doadorEncontrado ? <CardDoador doador={doadorEncontrado}/> : <p>Doador Não Encontrado.</p>}
    </>
}
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { DoadorContext } from '../../context/DoadorContext';
import CardDoador from './CardDoador';


export default function Doador() {
    const { id } = useParams();
    const [doador, setDoador] = useState(null);
    const { getDoador } = useContext(DoadorContext);

    useEffect(() => {
        handleDoador();        
    }, []);

    async function handleDoador() {
        const doadorEncontrado = await getDoador(id);

        console.log(doadorEncontrado)
        if(doadorEncontrado) {
            setDoador(doadorEncontrado);
        }
    }

    return <>
        {doador ? <CardDoador doador={doador}/> : <p>Doador Não Encontrado.</p>}
    </>
}
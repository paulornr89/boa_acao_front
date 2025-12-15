import CardDoador from "./CardDoador";
import { DoadorContext } from "../../context/DoadorContext";
import { useContext, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
// import mockDoadores from '../../data/doadores.json';

export default function ListaDeDoadores() {
    const [doadores, setDoadores] = useState([]);
    const { getAllDoadores, getDoador } = useContext(DoadorContext);

    useEffect(() => {
            const dados = async () => {
                const resposta = await getAllDoadores();

                if(resposta.data) {
                    setDoadores(resposta.data);
                }
            }
            dados();
        }, []);
    if(doadores.length > 0) {
        return doadores.map(doador => <Link key={doador.id} to={`/doadores/${doador.id}`}><CardDoador key={doador.id} doador={doador}/> </Link>)
    } else {
        return <p>Nenhum doador encontrado.</p>
    }
}
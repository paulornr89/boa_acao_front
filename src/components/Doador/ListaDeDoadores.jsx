import CardDoador from "./CardDoador";
import { DoadorContext } from "../../context/DoadorContext";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState, useEffect } from "react";
import { Link } from 'react-router-dom';

export default function ListaDeDoadores() {
    const [doadores, setDoadores] = useState([]);
    const { getAllDoadores } = useContext(DoadorContext);
    const { isAdmin } = useContext(AuthContext);

    useEffect(() => {
        const dados = async () => {
            const resposta = await getAllDoadores();

            if(resposta.data) {
                setDoadores(resposta.data);
            }
        }
        dados();
    }, []);

    if((doadores.length > 0) && isAdmin) {
        return doadores.map(doador => <Link key={doador.id} to={`/doadores/${doador.id}`}><CardDoador key={doador.id} doador={doador}/> </Link>)
    } else {
        return !isAdmin ? <p>Sem permissão para consulta.</p> : <p>Nenhum doador encontrado.</p>;
    }
}
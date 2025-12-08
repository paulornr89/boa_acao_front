import axiosClient from "../../utils/axios-client";
import CardOrganizacao from "./CardOrganizacao.jsx";
import { useState, useEffect } from "react";
const API_URL = import.meta.env.VITE_API_URL;
// import mockDoadores from '../../data/doadores.json';

export default function ListaDeOrganizacoes() {
    const [organizacoes, setOrganizacoes] = useState([]);

    const getAllOrganizacoes = async () => {
        const organizacoes = await axiosClient.get(`${API_URL}/organizacoes`)
        .then(response => response.data)
        .then(data => data)
        .catch(error => console.error('Error:', error));
        console.log(organizacoes)
        return organizacoes;
    }

    useEffect(() => {
            const dados = async () => {
                const resposta = await getAllOrganizacoes();

                if(resposta.data) {
                    setOrganizacoes(resposta.data);
                }
            }
            dados();
        }, []);

    if(organizacoes.length > 0) {
        return <div className="flex flex-row gap-4 flex-wrap justify-center pt-4 pb-4">{organizacoes.map(organizacao => <CardOrganizacao key={organizacao.id} organizacao={organizacao}/>)}</div>
    } else {
        return <p>Nenhuma organização encontrada.</p>
    }
}
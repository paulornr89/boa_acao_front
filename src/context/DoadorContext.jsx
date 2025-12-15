import { createContext } from "react";
// import mockDoadores from '../data/doadores.json';
const API_URL = import.meta.env.VITE_API_URL;
import axiosClient from "../utils/axios-client.js";

export const DoadorContext = createContext();

export function DoadorProvider({ children }) {
    const getDoador = async (id) => {
       const doador = await axiosClient.get(`${API_URL}/doadores/${id}`)
        .then(response => response.data)
        .then(data => data.data)
        .catch(error => console.error('Error:', error));
       return doador;
    }
    
    const getAllDoadores = async () => {
        const doadores = await axiosClient.get(`${API_URL}/doadores`)
            .then(response => response.data)
            .catch(error => console.error('Error:', error));

        return doadores;
    }
    
    const storeDoador = async (userData) => {
        try {
            console.log("storeDoador chamado");
            console.log(userData);
            const idUser = await storeUser({
                email: userData.email,
                password: userData.senha,
                is_admin: false,
                is_donor: userData.is_donor,
                is_organization: userData.is_organization
            }); 
            
            if(idUser) {
                const doadores = await axiosClient.post(`${API_URL}/doadores`,{
                        user_id: idUser,
                        nome: userData.nome,
                        documento: userData.documento,
                        telefone: userData.telefone,
                        endereco: userData.endereco,
                        cep: userData.cep,
                        cidade: userData.cidade,
                        estado: userData.estado,
                        documento_tipo: userData.documento_tipo
                    })
                    .then(response => response.data)
                    .catch(error => console.error('Error:', error));
                console.log(doadores);
            }

            return true;
        } catch (error) {
            console.error('Error:', error);
            return false;
        }
    }

    const storeUser = async (userData) => {
        console.log("storeUser chamado");
        console.log(userData);
        try {
            const response = await axiosClient.post(`${API_URL}/users`, userData)
            .then(response => response.data)
            .catch(error => console.error('Error:', error));
    
            return response.data.id;
        } catch (error) {
            console.error('Error:', error);
            return null;
        }        
    }

    const update = async (id, doadorData) => {}

    const remove = async (id) => {}

    const doadoresValues = {
        getDoador,
        getAllDoadores,
        storeDoador,
        update,
        remove
    }

    return (<DoadorContext.Provider value={doadoresValues}>{children}</DoadorContext.Provider>);
}
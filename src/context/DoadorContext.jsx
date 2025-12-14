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

    const doadoresValues = {
        getDoador,
        getAllDoadores
    }

    return (<DoadorContext.Provider value={doadoresValues}>{children}</DoadorContext.Provider>);
}
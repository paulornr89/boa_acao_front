import { createContext } from "react";
import mockDoadores from '../data/doadores.json';

export const DoadorContext = createContext();

export function DoadorProvider({ children }) {
    const getDoador = (id) => {
        return mockDoadores.find(doador_ => doador_.id === parseInt(id));
    }
    
    const getAllDoadores = () => {
        return mockDoadores;
    }

    const doadoresValues = {
        getDoador,
        getAllDoadores
    }

    return (<DoadorContext.Provider value={doadoresValues}>{children}</DoadorContext.Provider>)
}
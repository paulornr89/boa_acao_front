import { createContext } from "react";
const API_URL = import.meta.env.VITE_API_URL;
//import mockItens from '../data/itens.json';

export const ItemContext = createContext();

export function ItemProvider({ children }) {
    const getItem = async (id) => {
        const item = await fetch(`${API_URL}/v1/itens/${id}`)
        .then(response => response.json())
        .then(data => data)
        .catch(error => console.error('Error fetching data:', error));
        return item;//mockItens.find(item => item.id === parseInt(id));
    }

    const getAllItems = async () => {
        const itens = await fetch(`${API_URL}/v1/itens`)
        .then(response => response.json())
        .then(data => data)
        .catch(error => console.error('Error fetching data:', error));
       return itens;
    }

    const itemValues = {
        getItem,
        getAllItems
    }

    return (<ItemContext.Provider value={itemValues}>
        {children}
    </ItemContext.Provider>);
}

import { createContext } from "react";
import mockItens from '../data/itens.json';

export const ItemContext = createContext();

export function ItemProvider({ children }) {
    const getItem = (id) => {
        return mockItens.find(item => item.id === parseInt(id));
    }

    const getAllItems = () => {
        return mockItens;
    }

    const itemValues = {
        getItem,
        getAllItems
    }

    return (<ItemContext.Provider value={itemValues}>
        {children}
    </ItemContext.Provider>);
}

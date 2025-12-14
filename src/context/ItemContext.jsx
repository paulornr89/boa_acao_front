import { createContext } from "react";
import axiosClient from "../utils/axios-client";
const API_URL = import.meta.env.VITE_API_URL;
//import mockItens from '../data/itens.json';

export const ItemContext = createContext();

export function ItemProvider({ children }) {
    const getItem = async (id) => {
        const item = await axiosClient.get(`${API_URL}/itens/${id}`)
        .then(response => response.data)
        .then(data => data.data)
        .catch(error => console.error('Error:', error));

        return await item;
    }

    const getAllItems = async () => {
        const itens = await axiosClient.get(`${API_URL}/itens`)
        .then(response => response.data)
        .catch(error => console.error('Error:', error));

       return itens;
    }

    const update = async (id, itemData) => {
        const response = await axiosClient.put(`${API_URL}/itens/${id}`, itemData)
        .then(response => response.data)
        .catch(error => console.error('Error:', error));

        console.log(response)

        return response;
    }

    const itemValues = {
        getItem,
        getAllItems,
        update
    }

    return (<ItemContext.Provider value={itemValues}>
        {children}
    </ItemContext.Provider>);
}

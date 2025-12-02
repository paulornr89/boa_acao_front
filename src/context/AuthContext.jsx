import { createContext, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;
import axiosClient from '../utils/axios-client.js';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);
    const [token, setToken] = useState(localStorage.getItem('ACCESS_TOKEN') || null);

    const login = async (userData) => {//userdata são as informações para autenticação login e senha
        try {
            const { data } = await axiosClient.post("/tokens/login", userData);

            setUser(data.user);
            setToken(data.token);

            localStorage.setItem("USER", JSON.stringify(data.user));
            localStorage.setItem("ACCESS_TOKEN", data.token);

            return true;
        }catch (error) {
            console.error("Erro no login:", error);
            return false;
        }
    } 
    
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("USER");
        localStorage.removeItem("ACCESS_TOKEN");
    }

    const AuthValues = {
        user, 
        setUser,
        token,
        setToken,
        isAuthenticated: !!token,
        login,
        logout
    }

    return (<AuthContext.Provider value={AuthValues}>
        {children}
    </AuthContext.Provider>);
}
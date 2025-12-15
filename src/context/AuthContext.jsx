import { createContext, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;
import axiosClient from '../utils/axios-client.js';
import md5 from "crypto-js/md5";
import { manipulateLocalStorage } from "../utils/encrypt-storage";

manipulateLocalStorage();

export const AuthContext = createContext();

const ACCESS_TOKEN_KEY = md5("ACCESS_TOKEN" + navigator.userAgent).toString();
const USER_KEY = md5("USER_DATA" + navigator.userAgent).toString();
const EXPIRES_KEY = md5("EXPIRES_IN" + navigator.userAgent).toString();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(localStorage.getDecryptedItem(USER_KEY) ? JSON.parse(localStorage.getDecryptedItem(USER_KEY)) : null);
    const [token, setToken] = useState(localStorage.getDecryptedItem(ACCESS_TOKEN_KEY) || null);
    const [isAdmin, setIsAdmin] = useState(useState(localStorage.getDecryptedItem(USER_KEY) ? JSON.parse(localStorage.getDecryptedItem(USER_KEY)).is_admin  : false));

    const login = async (userData) => {//userdata são as informações para autenticação login e senha
        try {
            localStorage.clear();
            const { data } = await axiosClient.post("/tokens/login", userData);
            const expire = Date.now() + 7 * 24 * 60 * 60 * 1000;

            setUser(data.user);
            setToken(data.token);
            setIsAdmin(data.user.is_admin);

            //localStorage.setItem("USER", JSON.stringify(data.user));
            //localStorage.setItem("ACCESS_TOKEN", data.token);
            localStorage.setEncryptedItem(ACCESS_TOKEN_KEY, data.token);
            localStorage.setEncryptedItem(USER_KEY, JSON.stringify(data.user));
            localStorage.setEncryptedItem(EXPIRES_KEY, expire.toString());
            //localStorage.setEncryptedItem(TIPO_KEY, "tipo");

            return true;
        }catch (error) {
            console.error("Erro no login:", error);
            return false;
        }
    } 
    
    const logout = () => {
        setUser(null);
        setToken(null);
        //localStorage.removeItem("USER");
        //localStorage.removeItem("ACCESS_TOKEN");
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        localStorage.removeItem(EXPIRES_KEY);
        localStorage.clear();
    }

    const AuthValues = {
        user, 
        setUser,
        token,
        setToken,
        isAuthenticated: !!token,
        isAdmin,
        //isDoador,
        //isOrganizacao,
        login,
        logout
    }

    return (<AuthContext.Provider value={AuthValues}>
        {children}
    </AuthContext.Provider>);
}
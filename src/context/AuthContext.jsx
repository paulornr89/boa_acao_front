import { createContext, useState, useContext, use } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const login = (userData) => {
        setUser(userData);
    } 
    
    const logout = () => {
        setUser(null);
    }

    const AuthValues = {
        user, 
        setUser,
        isAuthenticated: !!user,
        login,
        logout
    }

    return (<AuthContext.Provider value={AuthValues}>
        {children}
    </AuthContext.Provider>);
}
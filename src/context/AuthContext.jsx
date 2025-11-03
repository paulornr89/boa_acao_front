import { createContext, useState, useContext, use } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    } 
    
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
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
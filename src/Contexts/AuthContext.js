import React, { useState, createContext } from "react";
import isAuthenticated from "../Helpers/isAuthenticated";

export const AuthContext = createContext();

export const AuthProvider = props => {
    const [userAuthenticated, setUserAuthenticated] = useState(isAuthenticated());
    return (
        <AuthContext.Provider value={[userAuthenticated, setUserAuthenticated]}>
            {props.children}
        </AuthContext.Provider>
    );
}
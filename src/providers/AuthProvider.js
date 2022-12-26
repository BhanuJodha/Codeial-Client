import { createContext } from "react";
import { useProvideState } from "../hooks";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const state = useProvideState();

    return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
}
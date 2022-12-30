import { createContext } from "react";
import { useAuthProvideState } from "../hooks";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const state = useAuthProvideState();

    return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
}
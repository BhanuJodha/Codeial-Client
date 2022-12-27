import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify";
import jwt from "jwt-decode";

import { login, signup } from "../api";
import { AuthContext } from "../providers/AuthProvider";
import { LOCAL_KEY } from "../utils";

export const useProvideState = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem(LOCAL_KEY);
        // if token exist
        if (token) {
            setUser(jwt(token));
        }
        setLoading(false);
    }, [])

    const logIn = async (email, password, toastID) => {
        const response = await login(email, password);

        if (response.success){
            // setting user in global context
            setUser(response.data.user);
            // setting user in local storage
            localStorage.setItem(LOCAL_KEY, response.data.token);
            // updating notification
            toast.update(toastID, { render: "Login successfull", type: "success", isLoading: false, closeButton: true, autoClose: true});
        }
        else{
            // updating notification
            toast.update(toastID, { render: response.message, type: "warning", isLoading: false, closeButton: true, autoClose: true });
        }

        return response;
    }

    const logOut = () => {
        setUser(null);
        localStorage.removeItem(LOCAL_KEY);
        toast.success("Logged out sucessfully");
    }

    const signUp = async (name, email, password, confirmPassword, toastID) => {
        const response = await signup(name, email, password, confirmPassword);

        if (response.success){            
            // updating notification
            toast.update(toastID, { render: response.message, type: "success", isLoading: false, closeButton: true, autoClose: true});
        }
        else{
            // updating notification
            toast.update(toastID, { render: response.message, type: "warning", isLoading: false, closeButton: true, autoClose: true });
        }

        return response;
    }

    return {
        user,
        loading,
        logIn,
        logOut,
        signUp
    }
}

export const useAuth = () => {
    return useContext(AuthContext);
}
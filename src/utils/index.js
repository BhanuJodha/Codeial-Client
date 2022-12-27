import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks";

export * from "./constants";

export const getFormBody = (params) => {
    const output = [];
    for (let key in params) {
        const myKey = encodeURIComponent(key);
        const value = encodeURIComponent(params[key]);

        output.push(myKey + "=" + value);
    }
    return output.join('&');
}

export const PrivateRoute = ({element}) => {
    const auth = useAuth();
    if (auth.user) {
        return element;
    }

    return <Navigate to="/"/>
}

export const PublicRoute = ({element}) => {
    const auth = useAuth();
    if (!auth.user) {
        return element;
    }

    return <Navigate to="/"/>
}
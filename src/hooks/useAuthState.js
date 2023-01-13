import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import jwt from "jwt-decode";

import { login, signup, editUser as editUserApi, addFollow, removeFollow, fetchFollowing } from "../api";
import { LOCAL_KEY } from "../utils";

export const useAuthProvideState = () => {
    const [token, setToken] = useState(localStorage.getItem(LOCAL_KEY));
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Adding user if exist
    useEffect(() => {
        (async () => {
            if (token) {
                const user = jwt(token);
                const response = await fetchFollowing();
                user.following = response.data.following;
                setUser(user);
            }
            setLoading(false);
        })();
    }, [token])

    const logIn = async (email, password, toastID) => {
        const response = await login(email, password);

        if (response.success) {
            // setting user in local storage
            localStorage.setItem(LOCAL_KEY, response.data.token);
            // setting token in state then useEffect sets the user
            setToken(response.data.token);
            // updating notification
            toast.update(toastID, { render: "Login successfull", type: "success", isLoading: false, closeButton: true, autoClose: true });
        }
        else {
            // updating notification
            toast.update(toastID, { render: response.message, type: "warning", isLoading: false, closeButton: true, autoClose: true });
        }

        return response;
    }

    const logOut = () => {
        setUser(null);
        localStorage.removeItem(LOCAL_KEY);
        setToken(null);
        toast.success("Logged out sucessfully");
    }

    const signUp = async (name, email, password, confirmPassword, toastID) => {
        const response = await signup(name, email, password, confirmPassword);

        if (response.success) {
            // updating notification
            toast.update(toastID, { render: response.message, type: "success", isLoading: false, closeButton: true, autoClose: true });
        }
        else {
            // updating notification
            toast.update(toastID, { render: response.message, type: "warning", isLoading: false, closeButton: true, autoClose: true });
        }

        return response;
    }

    const editUser = async (name, password, confirmPassword, avatar, toastID) => {
        const response = await editUserApi(user._id, name, password, confirmPassword, avatar);

        if (response.success) {
            localStorage.setItem(LOCAL_KEY, response.data.token);
            // setting token in state then useEffect sets the user
            setToken(response.data.token);
            // updating notification
            toast.update(toastID, { render: response.message, type: "success", isLoading: false, closeButton: true, autoClose: true });
        }
        else {
            // updating notification
            toast.update(toastID, { render: response.message, type: "warning", isLoading: false, closeButton: true, autoClose: true });
        }

        return response;
    }

    const createFollowing = async (userId, toastID) => {
        const response = await addFollow(userId);

        if (response.success) {
            user.following.push(response.data.follow);
            setUser(user);
            toast.update(toastID, { render: response.message, type: "success", isLoading: false, closeButton: true, autoClose: true });
        }
        else {
            // updating notification
            toast.update(toastID, { render: response.message, type: "warning", isLoading: false, closeButton: true, autoClose: true });
        }

        return response;
    }

    const removeFollowing = async (userId, toastID) => {
        const response = await removeFollow(userId);

        if (response.success) {
            user.following = user.following.filter((e) => userId !== e.to_user._id);
            setUser(user);
            toast.update(toastID, { render: response.message, type: "success", isLoading: false, closeButton: true, autoClose: true });
        }
        else {
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
        signUp,
        editUser,
        createFollowing,
        removeFollowing
    }
}
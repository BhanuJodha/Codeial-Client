import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify";
import jwt from "jwt-decode";

import { login, signup, editUser as editUserApi, addFriend, fetchFriends, removeFriendship, getPost, createPost, createComment } from "../api";
import { AuthContext } from "../providers/AuthProvider";
import { LOCAL_KEY } from "../utils";
import { PostsContext } from "../providers/PostsProvider";

export const useAuthProvideState = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Adding user if exist
    useEffect(() => {
        (async () => {
            const token = localStorage.getItem(LOCAL_KEY);
            // if token exist
            if (token) {
                const user = jwt(token);
                const response = await fetchFriends();
                if (response.success) {
                    user.friendships = response.data.friends;
                }
                setUser(user);
            }
            setLoading(false);
        })();
    }, [])

    const logIn = async (email, password, toastID) => {
        const response = await login(email, password);

        if (response.success) {
            // setting user in local storage
            localStorage.setItem(LOCAL_KEY, response.data.token);
            // setting user in global context
            const responseUser = jwt(response.data.token);
            const friendsResponse = await fetchFriends();
            if (friendsResponse.success) {
                responseUser.friendships = friendsResponse.data.friends;
            }
            setUser(responseUser);
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

    const editUser = async (name, password, confirmPassword, toastID) => {
        const response = await editUserApi(user._id, name, password, confirmPassword);

        if (response.success) {
            if (response.data.token) {
                // setting updated user in global context with existing friendships
                setUser({friendships: user.friendships, ...response.data.user});
                // setting updated user in local storage
                localStorage.setItem(LOCAL_KEY, response.data.token);
                // updating notification
            }
            toast.update(toastID, { render: response.message, type: "success", isLoading: false, closeButton: true, autoClose: true });
        }
        else {
            // updating notification
            toast.update(toastID, { render: response.message, type: "warning", isLoading: false, closeButton: true, autoClose: true });
        }

        return response;
    }

    const createFriendship = async (userId, toastID) => {
        const response = await addFriend(userId);

        if (response.success) {    
            user.friendships.push(response.data.friendship);
            setUser(user);
            toast.update(toastID, { render: response.message, type: "success", isLoading: false, closeButton: true, autoClose: true });
        }
        else {
            // updating notification
            toast.update(toastID, { render: response.message, type: "warning", isLoading: false, closeButton: true, autoClose: true });
        }

        return response;
    }

    const removeFriend = async (userId, toastID) => {
        const response = await removeFriendship(userId);

        if (response.success) {            
            user.friendships = user.friendships.filter((e) => userId !== e.to_user._id);
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
        createFriendship,
        removeFriend
    }
}

export const useAuth = () => {
    return useContext(AuthContext);
}

export const usePostsProvideState = () => {
    const [posts, setPosts] = useState([]);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        getPost(1, 30).then((data) => {
            setPosts(data.data.posts);
            setLoader(false);
        })
    }, [])

    
    const addPost = async (content, toastID) => {
        const response = await createPost(content);
        if (response.success) {
            // adding new post to existing one
            setPosts([response.data.post, ...posts]);
            toast.update(toastID, { render: response.message, type: "success", isLoading: false, closeButton: true, autoClose: true });
        }
        else {
            toast.update(toastID, { render: response.message, type: "warning", isLoading: false, closeButton: true, autoClose: true });
        }
        return response;
    }

    const addComment = async (post, content, toastID) => {
        const response = await createComment(post._id, content);
        if (response.success) {
            // post.comments = [response.data.comment, ...post.comments];
            post.comments.unshift(response.data.comment);
            setPosts(posts);
            toast.update(toastID, { render: response.message, type: "success", isLoading: false, closeButton: true, autoClose: true });
        }
        else {
            toast.update(toastID, { render: response.message, type: "warning", isLoading: false, closeButton: true, autoClose: true });
        }
        return response;
    }

    return {
        posts,
        loader,
        addPost,
        addComment
    }
}

export const usePosts = () => {
    return useContext(PostsContext);
}
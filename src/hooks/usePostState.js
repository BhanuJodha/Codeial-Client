import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createComment, createPost, deleteComment, deletePost, getPost, toggleLike } from "../api";

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

    const removePost = async (post_id, toastID) => {
        const response = await deletePost(post_id);
        if (response.success) {
            setPosts(posts.filter(post => response.data.post._id !== post._id));
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
            post.comments.unshift(response.data.comment);
            toast.update(toastID, { render: response.message, type: "success", isLoading: false, closeButton: true, autoClose: true });
        }
        else {
            toast.update(toastID, { render: response.message, type: "warning", isLoading: false, closeButton: true, autoClose: true });
        }
        return response;
    }
    
    const removeComment = async (post, comment_id, toastID) => {
        const response = await deleteComment(comment_id);
        if (response.success) {
            post.comments = post.comments.filter(comment => response.data.comment._id !== comment._id);
            toast.update(toastID, { render: response.message, type: "success", isLoading: false, closeButton: true, autoClose: true });
        }
        else {
            toast.update(toastID, { render: response.message, type: "warning", isLoading: false, closeButton: true, autoClose: true });
        }
        return response;
    }

    const like = async (reference, onModel, toastID) => {
        const response = await toggleLike(reference._id, onModel);
        if (response.success) {
            if (response.data.deleted){
                reference.likes = reference.likes.filter(like => response.data.like._id !== like._id);
            }
            else{
                reference.likes.push(response.data.like)
            }
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
        addComment,
        removeComment,
        removePost,
        like
    }
}
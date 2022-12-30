import { createContext } from "react";
import { usePostsProvideState } from "../hooks";

export const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
    const state = usePostsProvideState();

    return <PostsContext.Provider value={state}>{children}</PostsContext.Provider>
}
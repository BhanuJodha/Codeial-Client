import { useContext} from "react"
import { AuthContext } from "../providers/AuthProvider";
import { PostsContext } from "../providers/PostsProvider";

export * from "./useAuthState";
export * from "./usePostState";

export const useAuth = () => {
    return useContext(AuthContext);
}


export const usePosts = () => {
    return useContext(PostsContext);
}
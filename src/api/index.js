import { API_URLS, getFormBody, LOCAL_KEY } from "../utils";

const customFetch = async (url, { ...config }) => {
    config.headers = {
        "content-type": "application/x-www-form-urlencoded",
        Accept: "json/application"
    }

    // stringify body
    // if (config.body)
    //     config.body = JSON.stringify(config.body);

    const key = window.localStorage.getItem(LOCAL_KEY);
    if (key)
        config.headers.Authorization = `Bearer ${key}`;

    try {
        const response = await fetch(url, config);
        const json = await response.json();
        return json;

    } catch (err) {
        console.error(err.message);
        return {
            message: err.message,
            success: false
        }
    }
}

export const getPost = (page, limit) => {
    return customFetch(API_URLS.posts(page, limit), { methord: "GET" });
}

export const login = (email, password) => {
    return customFetch(API_URLS.login(), { 
        method: "POST",
        body: getFormBody({email, password})
    });
}

export const signup = (name, email, password, confirm_password) => {
    return customFetch(API_URLS.signup(), { 
        method: "POST",
        body: getFormBody({name, email, password, confirm_password})
    });
}

export const editUser = (id, name, password, confirm_password) => {
    return customFetch(API_URLS.editUser(), { 
        method: "POST",
        body: getFormBody({id, name, password, confirm_password})
    });
}

export const fetchUser = (userId) => {
    return customFetch(API_URLS.userInfo(userId), { 
        method: "GET"
    });
}

export const addFollow = (userId) => {
    return customFetch(API_URLS.addFollow(userId), { 
        method: "POST"
    });
}

export const fetchFollowing = () => {
    return customFetch(API_URLS.following(), { 
        method: "GET"
    });
}

export const removeFollow = (userId) => {
    return customFetch(API_URLS.removeFollow(userId), { 
        method: "POST"
    });
}

export const createPost = (content) => {
    return customFetch(API_URLS.createPost(), { 
        method: "POST",
        body: getFormBody({content})
    });
}

export const deletePost = (post_id) => {
    return customFetch(API_URLS.deletePost(post_id), { 
        method: "DELETE"
    });
}

export const createComment = (post_id, content) => {
    return customFetch(API_URLS.comment(), { 
        method: "POST",
        body: getFormBody({post_id, content})
    });
}

export const deleteComment = (comment_id, content) => {
    return customFetch(API_URLS.deleteComment(comment_id), { 
        method: "DELETE"
    });
}

export const searchUser = (text) => {
    return customFetch(API_URLS.searchUsers(text), { 
        method: "GET"
    });
}
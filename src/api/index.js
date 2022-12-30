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

export const addFriend = (userId) => {
    return customFetch(API_URLS.createFriendship(userId), { 
        method: "POST"
    });
}

export const fetchFriends = () => {
    return customFetch(API_URLS.friends(), { 
        method: "GET"
    });
}

export const removeFriendship = (userId) => {
    return customFetch(API_URLS.removeFriend(userId), { 
        method: "POST"
    });
}

export const createPost = (content) => {
    return customFetch(API_URLS.createPost(), { 
        method: "POST",
        body: getFormBody({content})
    });
}

export const createComment = (post_id, content) => {
    return customFetch(API_URLS.comment(), { 
        method: "POST",
        body: getFormBody({post_id, content})
    });
}
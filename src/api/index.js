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
        config.headers.Authentication = `Bearer ${key}`;

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
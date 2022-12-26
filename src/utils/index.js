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
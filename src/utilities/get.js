import { API_URL, IP_API_URL } from "../constants";
export const get = async (url, body = false, ...props) => {
    if (body !== false) {
        let dataStr = '';
        for ( let key in body) {
        if (body.hasOwnProperty(key)) {
            dataStr += key + '=' + body[key] + ';';
        }
        }
        url += '?' + dataStr;
    }

    try {
        const response = await fetch(IP_API_URL + url);
        const json = await response.json();
        return json;
    } catch(error) {
        console.error(error);
        return false;
    }
};

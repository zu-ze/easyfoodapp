import { API_URL, IP_API_URL } from "../constants";

export const post = async (url, body, ...props) => {
    try {
        const response = await fetch(
            IP_API_URL + url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
                body: JSON.stringify(body)
            }
        );

        const json = await response.json();

        return json;
    } catch(error) {
        console.error(error);
        return false;
    }
};

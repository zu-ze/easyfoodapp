import { API_URL, IP_API_URL } from "../constants";

export const put = async (url, body, ...props) => {
    try {
        const response = await fetch(
            IP_API_URL + url, {
            method: "PUT",
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

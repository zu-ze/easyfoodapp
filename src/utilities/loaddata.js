import { get } from "./get";
import { post } from "./post";

export const loadComments  = async () => {
    const response = await get('/api/comment');

    if (response.status === true) {
        return response.records;
    } else {
        return []
    }
};

export const loadMenu = async (id) => {
    const response = await get('/api/dish/'+id)

    if (response.status === true) {
        return response.fooditems
    } else {
        return []
    }
};
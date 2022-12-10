export const setCart = (cart) => {
    return {
        type: "SET_CART",
        payload: cart
    }
}

export const resetCart = () => {
    return {
        type: "RESET_CART"
    }
}
const initialState = []

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CART':
            return action.payload
        case 'RESET_CART':
            return []
        default:
            return state
    }
}

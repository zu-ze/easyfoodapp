const initialState = null

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return action.payload
        case 'RESET_USER':
            return {}
        default:
            return state
    }
}

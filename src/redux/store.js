import { createStore, combineReducers} from 'redux'
import CartReducer from './reducers/CartReducer'
import UserReducer from './reducers/UserReducer'

const rootReducer = combineReducers({
    cart: CartReducer,
    user: UserReducer
})

export const store = createStore(rootReducer)
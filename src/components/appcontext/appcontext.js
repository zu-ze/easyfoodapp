import { createContext } from "react";

export const AppContext = createContext({
    userdata: {},
    setUserdata: () => {},
    cartdata: [],
    setCartdata: () => {}
    
})
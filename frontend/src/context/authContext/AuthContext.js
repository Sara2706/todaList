import { createContext, useReducer } from "react"
import AuthReducer from "./authReducer";

const INITIAL_STATE = {
    user : localStorage.getItem('todoUser') || false 
}

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children}) => {
    const [state, setState] = useReducer(AuthReducer,INITIAL_STATE);

    return (
        <AuthContext.Provider value={{user:state.user, setState}}>
            {children}
        </AuthContext.Provider>
    )
}
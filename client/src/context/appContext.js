import React,{ useReducer, useContext } from 'react'
import reducer from './reducer'
import { DISPLAY_ALERT, CLEAR_ALERT, PASSWORD_UNMATCH } from './actions'

const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
}

const AppContext = React.createContext()

const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const displayAlert = () =>{
        dispatch({type: DISPLAY_ALERT})
        clearAlert()
    }

    const clearAlert = () =>{
        setTimeout(()=>{
            dispatch({type: CLEAR_ALERT})
        },2000)
    }

    const passwordUnmatch = () =>{
        dispatch({type: PASSWORD_UNMATCH})
        clearAlert()
    }

    return <AppContext.Provider 
            value={
                {...state,
                 displayAlert,
                 passwordUnmatch,                   
                }
            }>
        {children}
    </AppContext.Provider>
}

const useAppContext = () => {
    return useContext(AppContext)
}

export {AppProvider, initialState, useAppContext}
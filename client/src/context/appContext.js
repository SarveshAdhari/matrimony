import React,{ useReducer, useContext } from 'react'
import reducer from './reducer'
import axios from 'axios'

import { 
    DISPLAY_ALERT, 
    CLEAR_ALERT, 
    PASSWORD_UNMATCH, 
    REGISTER_USER_BEGIN, 
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
} from './actions'

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')

const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user:user? JSON.parse(user) : null,
    token:token,
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

    const addUserToLocalStorage = ({user,token}) =>{
        localStorage.setItem('user',JSON.stringify(user))
        localStorage.setItem('token',token)
    }

    const removeUserFromLocalStorage = ({user,token}) =>{
        localStorage.removeItem('user')
        localStorage.removeItem('token')
    }

    const registerUser = async (currentUser) =>{
        dispatch({type: REGISTER_USER_BEGIN})
        try {
            const response = await axios.post('/api/v1/auth/register', currentUser)
            console.log(response.data)
            const {user, token} = response.data
            dispatch({type: REGISTER_USER_SUCCESS, payload:{user,token}})
            addUserToLocalStorage({user, token})
        } catch (error) {
            dispatch({type: REGISTER_USER_ERROR, payload:{msg: error.response.data.msg}})
        }
        clearAlert()
    }

    return <AppContext.Provider 
            value={
                {...state,
                 displayAlert,
                 passwordUnmatch,
                 registerUser,                   
                }
            }>
        {children}
    </AppContext.Provider>
}

const useAppContext = () => {
    return useContext(AppContext)
}

export {AppProvider, initialState, useAppContext}
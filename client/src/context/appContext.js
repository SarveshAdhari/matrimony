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
    LOGIN_USER_BEGIN, 
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    LOGOUT_USER,
    DELETE_USER,
    UPDATE_USER_BEGIN, 
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    GET_USERS_BEGIN,
    GET_USERS_SUCCESS,
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
    users:null,
}

const AppContext = React.createContext()

const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    // Axios 
    const authFetch = axios.create({
        baseURL: '/api/v1/auth',
    })
    //Request
    authFetch.interceptors.request.use((config)=>{
        config.headers['Authorization'] = `Bearer ${state.token}`
        return config
    },
    (error)=>{
        return Promise.reject(error)
    })
    // Response
    authFetch.interceptors.response.use((response)=>{
        return response
    },
    (error)=>{
        // console.log(error)
        if(error.response.status === 401){
            logoutUser()
        }
        return Promise.reject(error)
    })

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

    const removeUserFromLocalStorage = () =>{
        localStorage.removeItem('user')
        localStorage.removeItem('token')
    }

    const registerUser = async (currentUser) =>{
        dispatch({type: REGISTER_USER_BEGIN})
        try {
            const response = await axios.post('/api/v1/auth/register', currentUser)
            // console.log(response.data)
            const {user, token} = response.data
            dispatch({type: REGISTER_USER_SUCCESS, payload:{user,token}})
            addUserToLocalStorage({user, token})
        } catch (error) {
            dispatch({type: REGISTER_USER_ERROR, payload:{msg: error.response.data.msg}})
        }
        clearAlert()
    }

    const loginUser = async(currentUser) => {
        dispatch({type: LOGIN_USER_BEGIN})
        try {
            const {data} = await axios.post('/api/v1/auth/login', currentUser)
            const {user, token} = data
            dispatch({type: LOGIN_USER_SUCCESS, payload:{user,token}})
            addUserToLocalStorage({user,token})
        } catch (error) {
            dispatch({type: LOGIN_USER_ERROR, payload:{msg: error.response.data.msg}})
        }
        clearAlert()
    }

    const logoutUser = async () =>{
        dispatch({type: LOGOUT_USER})
        removeUserFromLocalStorage()
    }

    const deleteUser = async(userEmail) =>{
        dispatch({type:DELETE_USER})
        try {
            await axios.delete(`/api/v1/auth/${userEmail}`)
            logoutUser()
        } catch (error) {
            logoutUser()
        }
    }

    const updateUser = async (currentUser) =>{
        dispatch({type: UPDATE_USER_BEGIN})
        try {
            const {data} = await authFetch.patch(`/updateUser`, currentUser)
            const {user,token} = data
            dispatch({type: UPDATE_USER_SUCCESS, payload:{user,token}})
            addUserToLocalStorage({user,token})
        } catch (error) {
            dispatch({type: UPDATE_USER_ERROR, payload:{msg: error.response.data.msg}})
        }
        clearAlert()
    }
    const getUsers = async () =>{
        dispatch({type: GET_USERS_BEGIN})
        try {
            const {data} = await authFetch.get('/')
            const users = data.users
            // console.log(users)
            dispatch({type: GET_USERS_SUCCESS, payload:{users}})
        } catch (error) {
            console.log(error)
        }
    }

    return <AppContext.Provider 
            value={
                {...state,
                 displayAlert,
                 passwordUnmatch,
                 registerUser,
                 loginUser,
                 logoutUser, 
                 deleteUser, 
                 updateUser,
                 getUsers,                  
                }
            }>
        {children}
    </AppContext.Provider>
}

const useAppContext = () => {
    return useContext(AppContext)
}

export {AppProvider, initialState, useAppContext}
import { 
    CLEAR_ALERT, 
    DISPLAY_ALERT, 
    PASSWORD_UNMATCH, 
    REGISTER_USER_BEGIN, 
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
    LOGIN_USER_BEGIN, 
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    LOGOUT_USER,
} from "./actions"

const reducer = (state, action) => {
    if(action.type === DISPLAY_ALERT){
        return {
            ...state,
            showAlert: true,
            alertText: 'Please Provide All Values!',
            alertType: 'danger',
        }
    }
    if(action.type === CLEAR_ALERT){
        return{
            ...state,
            showAlert: false,
            alertText: '',
            alertType: '',
        }
    }
    if(action.type === PASSWORD_UNMATCH){
        return {
            ...state,
            showAlert: true,
            alertText: 'The Passwords Do Not Match! Please Try Again.',
            alertType: 'warning',
        }
    }
    if(action.type === REGISTER_USER_BEGIN){
        return{
            ...state,
            isLoading: true,
            showAlert: false,
            alertText: '',
        }
    }
    if(action.type === REGISTER_USER_SUCCESS){
        return{
            ...state,
            user: action.payload.user,
            token: action.payload.token,
            isLoading: false,
            showAlert: true,
            alertType: 'success',
            alertText: 'Registered Successfully! Redirecting...',
        }
    }
    if(action.type === REGISTER_USER_ERROR){
        return{
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg,
        }
    }
    if(action.type === LOGIN_USER_BEGIN){
        return{
            ...state,
            isLoading: true,
            showAlert: false,
            alertText: '',
        }
    }
    if(action.type === LOGIN_USER_SUCCESS){
        return{
            ...state,
            user: action.payload.user,
            token: action.payload.token,
            isLoading: false,
            showAlert: true,
            alertType: 'success',
            alertText: 'Login Successfull! Redirecting...',
        }
    }
    if(action.type === LOGIN_USER_ERROR){
        return{
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg,
        }
    }
    if(action.type === 'LOGOUT_USER'){
        return{
            ...state,
            user:null,
            token:null,
        }
    }

    throw new Error(`No such action: ${action.type}`)
}

export default reducer
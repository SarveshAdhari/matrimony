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
    DELETE_USER,
    UPDATE_USER_BEGIN, 
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    GET_USERS_BEGIN,
    GET_USERS_SUCCESS,
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
    if(action.type === LOGOUT_USER){
        return{
            ...state,
            user:null,
            token:null,
        }
    }
    if(action.type === DELETE_USER){
        return{
            ...state,
            showAlert: false,
            user:null,
            token:null,
        }
    }
    if(action.type === UPDATE_USER_BEGIN){
        return{
            ...state,
            isLoading: true,
            showAlert: false,
        }
    }
    if(action.type === UPDATE_USER_SUCCESS){
        return{
            ...state,
            user: action.payload.user,
            token: action.payload.token,
            isLoading: false,
            alertType: 'success',
            alertText: 'Successfully Updated Your Profile',
            showAlert: true,
        }
    }
    if(action.type === UPDATE_USER_ERROR){
        return{
            ...state,
            isLoading: false,
            alertType: 'danger',
            alertText: action.payload.msg,
            showAlert: true, 
        }
    }
    if(action.type === GET_USERS_BEGIN){
        return{
            ...state,
            isLoading: true,
            showAlert: false,
        }
    }
    if(action.type === GET_USERS_SUCCESS){
        return{
            ...state,
            isLoading: false,
            users: action.payload.users,
        }
    }

    throw new Error(`No such action: ${action.type}`)
}

export default reducer
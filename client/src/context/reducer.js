import { 
    CLEAR_ALERT, 
    DISPLAY_ALERT, 
    PASSWORD_UNMATCH, 
    REGISTER_USER_BEGIN, 
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
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
            alertText: 'Successfully Registered! Redirecting...',
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

    throw new Error(`No such action: ${action.type}`)
}

export default reducer
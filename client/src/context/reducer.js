import { CLEAR_ALERT, DISPLAY_ALERT, PASSWORD_UNMATCH } from "./actions"

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

    throw new Error(`No such action: ${action.type}`)
}

export default reducer
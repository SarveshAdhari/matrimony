import '../assets/css/alert.css'
import { useAppContext } from '../context/appContext'

const Alert = () => {
    const { alertType, alertText } = useAppContext()

    return (
        <div className={`alert alert-${alertType}`} role="alert">
            {alertText}
        </div>
    )
}
export default Alert
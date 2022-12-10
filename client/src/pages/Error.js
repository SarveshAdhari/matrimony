import { Link} from 'react-router-dom'
import '../assets/css/error.css'

const Error = () => {
  return (
    <div className='err-div'>
      <div className='err-header'>
        <h1>Oops!</h1>
      </div>
      <div className='err-msg'>
      <p>
        Could not find what you were looking for.
      </p>
      </div>
      <div className='err-link'>
        <Link to="/register">Click here to go back to the login page.</Link>
      </div>
    </div>
  )
}
export default Error
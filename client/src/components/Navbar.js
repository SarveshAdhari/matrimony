import { Link } from 'react-router-dom'
import { ProfilePicture } from '../components/index'
import { useAppContext } from '../context/appContext'
import '../assets/css/navbar.css'

const Navbar = () => {
  const { logoutUser } = useAppContext()
  const handleLogout = () => {
    logoutUser()
  }

  return (
    <div className="nav">
      <div className="nav-logo">
        <Link to="/main">
          <p>Matrimony</p>
        </Link>
      </div>
      <div className="profile">
        <ProfilePicture />
      </div>
      <div className='logout'>
        <button
          className="logout-btn"
          type="button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  )
}
export default Navbar
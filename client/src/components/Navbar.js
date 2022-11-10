import { ProfilePicture } from '../components/index'
import '../assets/css/navbar.css'

const Navbar = () => {
  return (
    <div className="nav">
      <div className="nav-logo">
        <p>Matrimony</p>
      </div>
      <div className="profile">
        <ProfilePicture />
      </div>
      <div className='logout'>
        <button className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  )
}
export default Navbar
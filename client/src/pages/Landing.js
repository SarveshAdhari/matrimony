import { Link } from 'react-router-dom'
import { Logo } from '../components'

import '../assets/css/landing.css'
import landingLogo from '../assets/images/landingLogo.svg'

const Landing = () => {
  return (
    <div className='landing-wrapper'>
      <nav><Logo /></nav>
      <div className="main-content">
        <div className="desc">
          <h1>Struggling To Find Your <span className='dark'>Perfect</span> Partner?</h1>
          <p>Looking for your perfect partner online? Look no further than our website! With a wide range of filters and search criteria, you'll be able to find someone who ticks all the boxes. Plus, we're always updating our database with new users, so you'll never get bored with the selection!</p>
          <Link to="/register">Register/Login</Link>
        </div>
        <img className='main-img' src = {landingLogo} alt='main-logo' />
      </div>
      {/* <div className="desc-art">
        <div className="description">
          <div className="desc-title">
            <p>Struggling To Find Your <span className='dark'>Perfect</span> Partner?</p>
          </div>
          <div className="desc-text">
            <p>Nobody knows how long it would take for your Prince Charming to find a white horse and come to you. Sign Up today and browse across hundreds of profiles to find someone you might like. It's quick and easy!</p>
            <button className="register-btn">
            <Link to="/register">Register/Login</Link>
          </button>
          </div>
        </div>
        <div className="art">
          <img src={landingLogo} alt="" />
        </div>
      </div> */}
    </div>
  )
}
export default Landing
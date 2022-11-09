import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormField, Alert } from '../components'
import '../assets/css/register.css'
import { useAppContext } from '../context/appContext'

const initialState = {
  name:"",
  email:"",
  password:"",
  confirmPassword:"",
  isMember: true,
}

const Register = () => {
  const navigate = useNavigate()
  const [values, setValues] = useState(initialState)
  const {
    user, 
    showAlert, 
    displayAlert, 
    passwordUnmatch, 
    isLoading, 
    registerUser,
    loginUser,
  } = useAppContext()

  const toggleMember = () => {
    setValues({...values, isMember: !values.isMember })
  }

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, email, password, confirmPassword, isMember } = values
    if(!isMember && password !== confirmPassword){
      passwordUnmatch()
    }
    if(!email || !password || (!isMember && !name)){
      displayAlert()
    }

    const currentUser = {name,email,password}
    
    try {
      if(isMember){
        loginUser(currentUser)
      }
      else{
        registerUser(currentUser)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    if(user){
      setTimeout(()=>{
        navigate('/main')
      },2000)
    }
  },[user, navigate])

  return (
    <div className="register-wrapper">
      <form className="form" >
        <div className="heading">
          <p>{values.isMember? 'Login' : 'Register'}</p><hr />
        </div>
        {showAlert && <Alert />}
        <div className="form-fields">
          {!values.isMember && <FormField type="text" value="Username" name='name' handleChange={handleChange} />}
          <FormField type="email" value="Email" name='email' handleChange={handleChange} />
          <FormField type="password" value="Password" name='password' handleChange={handleChange} />
          {!values.isMember && <FormField type="password" value="Confirm Password" name='confirmPassword' handleChange={handleChange} />}
        </div>
        <div className="button">
          <button className='register-btn' type='button' onClick={handleSubmit} disabled={isLoading}>
            {values.isMember ? 'Login' : 'Register'}
          </button>
        </div>
        <p className='toggle'>{values.isMember ? 'Not A Member? ' : 'Already A Member? '} 
            <button 
            type="button" 
            onClick={toggleMember}
            >
              {values.isMember ? 'Register' : 'Login'}
            </button>
        </p>
      </form>
    </div>
  )
}
export default Register
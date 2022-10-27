import { useState } from 'react'
import { FormField } from '../components'
import '../assets/css/register.css'

const initialState = {
  name:"",
  email:"",
  password:"",
  isMember: true,
}

const Register = () => {

  const [values, setValues] = useState(initialState)

  const toggleMember = () => {
    setValues({...values, isMember: !values.isMember })
  }

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(values)
  }

  return (
    <div className="register-wrapper">
      <form className="form" >
        <div className="heading">
          <p>{values.isMember? 'Login' : 'Register'}</p><hr />
        </div>
        <div className="form-fields">
          {!values.isMember && <FormField type="text" value="Username" name='name' handleChange={handleChange} />}
          <FormField type="email" value="Email" name='email' handleChange={handleChange} />
          <FormField type="password" value="Password" name='password' handleChange={handleChange} />
          {!values.isMember && <FormField type="password" value="Confirm Password" handleChange={handleChange} />}
        </div>
        <div className="button">
          <button className='register-btn' type='button' onClick={handleSubmit}>
            {values.isMember ? 'Login' : 'Register'}
          </button>
        </div>
        <p className='toggle'>{values.isMember ? 'Not A Member? ' : 'Already A Member? '} 
            <button type="button" onClick={toggleMember}>{values.isMember ? 'Register' : 'Login'}</button>
        </p>
      </form>
    </div>
  )
}
export default Register
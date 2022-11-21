import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAppContext } from '../../context/appContext'
import { Alert, FormField } from '../../components'
import '../../assets/css/profile.css'

const Profile = () => {

  const { user, deleteUser, updateUser, showAlert, alertText } = useAppContext()
  // const [dp, setDp] = useState()
  const [name, setName] = useState(user?.name)
  const [email, setEmail] = useState(user?.email)
  const [occupation, setOccupation] = useState(user?.occupation)
  const [dob, setDob] = useState(user?.dob)
  const [gender, setGender] = useState(user?.gender)
  const [contact, setContact] = useState(user?.contact)
  const [income, setIncome] = useState(user?.income)
  const [location, setLocation] = useState(user?.location)

  const date = new Date()
  const pastDate = (date.getFullYear() - 18) + "-" + date.getMonth() + "-" + date.getDate()

  const navigate = useNavigate()

  const handleDelete = () =>{
    deleteUser(user.email)
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    // console.log(dp)
    const currentUser = {name, email, location, occupation, income, dob, gender, contact}
    console.log(currentUser)
    updateUser(currentUser)
  }

  return (
    <div className="my-profile">
      <div className="profile-heading">
        <p>My Profile</p>
      </div>
      <div className='alert-div'>{showAlert && <Alert />}</div>
      <div className="profile-form">
        <form encType="multipart/form-data">
        <div>
          {/* Name */}
        <FormField
        label
          type="text"
          value={user.name || "name"}
          name="name"
          handleChange={(e)=>setName(e.target.value)} />
        </div>

        <div>
          {/* Email */}
        <FormField
        label
          type="text"
          value={user.email || "email"}
          name="email"
          handleChange={(e)=>setEmail(e.target.value)} />
        </div>

        <div>
          {/* Occupation */}
        <FormField
        label
          type="text"
          value={user.occupation || "occupation"}
          name="occupation"
          handleChange={(e)=>setOccupation(e.target.value)} />
        </div>

        <div>
          {/* Location */}
        <FormField 
        label
        type="text"
          value={user.location || "city"}
          name="residing in"
          handleChange={(e)=>setLocation(e.target.value)} />
        </div>

        <div className='date'>
          {/* DOB */}
        <FormField
        label
          type="date"
          value={user.dob}
          name="dob"
          max = {pastDate}
          handleChange={(e)=>setDob(e.target.value)} />
        </div>

        <div>
          {/* Income */}
        <FormField
        label
          type="text"
          value={user.income || "income"}
          name="income"
          handleChange={(e)=>setIncome(e.target.value)} />
        </div>

        <div>
          {/* Contact */}
        <FormField
        label
          type="text"
          value={user.contact || "contact"}
          name="contact"
          handleChange={(e)=>setContact(e.target.value)} />
        </div>

        <div>
          {/* Gender */}
        <FormField
        label
          type="text"
          value={user.gender || "gender"}
          name="gender"
          handleChange={(e)=>setGender(e.target.value)} />
        </div>
        {/* <div className='dp'> */}
          {/* Display Picture */}
        {/* <FormField
        label
          type="file"
          name="dp"
          handleChange={(e)=>setDp(e.target.value)} />
        </div>*/}
      </form>
      <hr />
      <div className='btn-container'>
        {/* Delete Profile Button */}
      <button 
      className='delete-btn'
      onClick={handleDelete}
      >
          Delete Profile
        </button>
        {/* Back Button */}
      <button 
      className='cancel-btn'
      onClick={()=>navigate('/')}
      >
          Go Back
        </button>
        {/* Save changes button */}
        <button 
        className='submit-btn' 
        onClick={handleSubmit}
        >
          Save Changes
        </button>
      </div>
      </div>
    </div>
  )
}
export default Profile
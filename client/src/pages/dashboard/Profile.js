import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAppContext } from '../../context/appContext'
import { Alert, FormField, FormSelect, ProfilePicture } from '../../components'
import '../../assets/css/profile.css'

const Profile = () => {

  const { user, deleteUser, updateUser, showAlert, genderOptions } = useAppContext()
  const [dp, setDp] = useState()
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

  const handleDelete = () => {
    const email = user.email
    const conf = prompt("Please type your email to delete your account.Please note that this process is not reversible.")
    if(conf === email){
      deleteUser(user.email)
    }
    else{
      alert("Please enter valid credentials.")
    } 
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const currentUser = new FormData()
    // console.log(dp[0]);
    if(dp[0] && dp[0].size <= 250000){
      currentUser.append('dp',dp[0])
    }
    else{
      alert("Please upload an image less than 250kb")
      return
    }
    // const info = { name, email, location, occupation, income, dob, gender, contact,dp}
    // currentUser.append('dp',dp[0])
    currentUser.append('name',name)
    currentUser.append('email',email)
    currentUser.append('location',location)
    currentUser.append('occupation',occupation)
    currentUser.append('income',income)
    currentUser.append('dob',dob)
    currentUser.append('gender',gender)
    currentUser.append('contact',contact)
    currentUser.append('fileName',dp[0].name)
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
          <div className='dp'>
            <div>
              <ProfilePicture />
            </div>
            <FormField
              label
              type="file"
              name="dp"
            handleChange={(e)=>setDp(e.target.files)}
            />
          </div>
          <div>
            {/* Name */}
            <FormField
              label
              type="text"
              value={user.name || "name"}
              name="name"
              handleChange={(e) => setName(e.target.value)} />
          </div>

          <div>
            {/* Email */}
            <FormField
              label
              type="text"
              value={user.email || "email"}
              name="email"
              handleChange={(e) => setEmail(e.target.value)} />
          </div>

          <div>
            {/* Occupation */}
            <FormField
              label
              type="text"
              value={user.occupation || "occupation"}
              name="occupation"
              handleChange={(e) => setOccupation(e.target.value)} />
          </div>

          <div>
            {/* Location */}
            <FormField
              label
              type="text"
              value={user.location || "city"}
              name="residing in"
              handleChange={(e) => setLocation(e.target.value)} />
          </div>

          <div className='date'>
            {/* DOB */}
            <FormField
              label
              type="date"
              value={dob}
              name="dob"
              max={pastDate}
              handleChange={(e) => setDob(e.target.value)} />
          </div>

          <div className='income'>
            {/* Income */}
            <FormField
              label
              type="number"
              value={user.income || "income"}
              name="income"
              handleChange={(e) => setIncome(e.target.value)} />
          </div>

          <div className='contact'>
            {/* Contact */}
            <FormField
              label
              type="number"
              value={user.contact || "contact"}
              name="contact"
              handleChange={(e) => setContact(e.target.value)} />
          </div>

          <div className='gender'>
            {/* Gender */}
            <FormSelect
              label
              value={gender}
              name="gender"
              options={genderOptions}
              handleChange={(e) => setGender(e.target.value)} />
          </div>
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
            onClick={() => navigate('/')}
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
import { useAppContext } from '../../context/appContext'
import { FormField } from '../../components'
import '../../assets/css/profile.css'

const Profile = () => {

  const { user } = useAppContext()

  const handleChange = (e) => {
    console.log(e.target.value)
  }

  return (
    <div className="my-profile">
      <div className="profile-heading">
        <p>My Profile</p>
      </div>
      <div className="profile-form">
        <form>
        <div>
          {/* Name */}
        <FormField
        label
          type="text"
          value={user.name || "name"}
          name="name"
          handleChange={handleChange} />
        </div>

        <div>
          {/* Email */}
        <FormField
        label
          type="text"
          value={user.email || "email"}
          name="email"
          handleChange={handleChange} />
        </div>

        <div>
          {/* Occupation */}
        <FormField
        label
          type="text"
          value={user.occupation || "occupation"}
          name="occupation"
          handleChange={handleChange} />
        </div>

        <div>
          {/* Location */}
        <FormField 
        label
        type="text"
          value={user.location || "city"}
          name="residing in"
          handleChange={handleChange} />
        </div>

        <div>
          {/* DOB */}
        <FormField
        label
          type="text"
          value={user.dob || "dob"}
          name="dob"
          handleChange={handleChange} />
        </div>

        <div>
          {/* Income */}
        <FormField
        label
          type="text"
          value={user.income || "income"}
          name="income"
          handleChange={handleChange} />
        </div>

        <div>
          {/* Contact */}
        <FormField
        label
          type="text"
          value={user.contact || "contact"}
          name="contact"
          handleChange={handleChange} />
        </div>

        <div>
          {/* Gender */}
        <FormField
        label
          type="text"
          value={user.gender || "gender"}
          name="gender"
          handleChange={handleChange} />
        </div>
      </form>
      <hr />
      <div className='btn-container'>
      <button className='delete-btn'>
          Delete Profile
        </button>
      <button className='cancel-btn'>
          Go Back
        </button>
        <button className='submit-btn'>
          Update Profile
        </button>
      </div>
      </div>
    </div>
  )
}
export default Profile
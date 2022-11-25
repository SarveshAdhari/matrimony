import { useEffect, useState } from 'react'
import { FormSelect, FormField } from '../../components'
import { useAppContext } from '../../context/appContext'
import '../../assets/css/main.css'

const MainPage = () => {
  const { getUsers, users, user, genderOptions } = useAppContext()
  const [gender, setGender] = useState('male')
  const [age, setAge] = useState(21)
  const [loc, setLoc] = useState(user.location)

  const calculate_age = (dob1) => {
    var today = new Date()
    var birthDate = new Date(dob1)
    var age_now = today.getFullYear() - birthDate.getFullYear()
    var m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age_now--
    }
    return age_now
  }

  useEffect(() => {
    getUsers()
  }, [])
  // {users && console.log(users)}
  return (
    <div className='main-container'>
      <div className="filters">
          I'm looking for
          <FormSelect
          value={gender}
          name="gender"
          options={genderOptions}
          handleChange={(e)=>setGender(e.target.value)} />
          aged
          <FormSelect
          value={age}
          name="age"
          options={[21,22,23,24,25,26]}
          handleChange={(e)=>setAge(e.target.value)} />
          residing in 
          <FormField
          type="text"
          value={user.location}
          name="location"
          handleChange={(e)=>setLoc(e.target.value)} />
      </div>
      <div className="users-container">
        {!users && <p>Loading...</p>}
        {users && users.map((currUser) => {
          // Do not return current user
          if(user.email === currUser.email) return
          return (
            <div className='user-frame' key={currUser._id}>
              <div className='user-img'><p>*Image will come here*</p></div>
              <div className='user-details'>
            <p>Name: <span><i>{currUser.name}</i></span></p>
            <p>Age: <span><i>{calculate_age(currUser.dob)}</i></span></p>
            <p>Gender: <span><i>{currUser.gender}</i></span></p>
            <p>Residing In: <span><i>{currUser.location}</i></span></p>
            <p>Occupation: <span><i>{currUser.occupation}</i></span></p>
            <p>Income: <span><i>Rs. {currUser.income}</i></span></p>
            <p>Contact: <span><i>{currUser.contact}</i></span></p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default MainPage
import { useEffect } from 'react'
import { useAppContext } from '../../context/appContext'
import '../../assets/css/main.css'

const MainPage = () => {
  const { getUsers, users, user } = useAppContext()

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
      <div className="users-container">
        {!users && <p>Loading...</p>}
        {users && users.map((currUser) => {
          // Do not return current user
          // if(user.email === currUser.email) return
          return (
            <div className='user-frame' key={currUser._id}>
              <div className='user-img'><p>*Image will come here*</p></div>
              <div className='user-details'>
              <div><p>Name: {currUser.name}</p></div>
              <div><p>Age: {calculate_age(currUser.dob)}</p></div>
              <div><p>Gender: {currUser.gender}</p></div>
              <div><p>Residing In: {currUser.location}</p></div>
              <div><p>Occupation: {currUser.occupation}</p></div>
              <div><p>Income: {currUser.income}</p></div>
              <div><p>Contact: {currUser.contact}</p></div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default MainPage
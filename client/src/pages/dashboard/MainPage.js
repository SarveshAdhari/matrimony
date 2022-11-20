import { useEffect } from 'react'
import { useAppContext } from '../../context/appContext'
import '../../assets/css/main.css'

const MainPage = () => {
  const {getUsers, users} = useAppContext()
  useEffect(()=>{
    getUsers()
  },[])
  {users && console.log(users)}
  return (
    <div className='main-container'>
      <div className="users-container">
      {users && users.map((user)=>{
       return <div className='user-frame' key={user._id}>
          {user.name}
        </div>
      })}
      </div>
    </div>
  )
}
export default MainPage
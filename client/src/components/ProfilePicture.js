import { useAppContext } from '../context/appContext'
import male from '../assets/images/male_propic.svg'
import female from '../assets/images/female_propic.svg'

const ProfilePicture = () => {
    const {user} = useAppContext()
    if(user.gender == 'female'){
        return (
            <img src={female} alt="DP" width={50} height={50} />
          )
    }
    else{
        return (
            <img src={male} alt="DP" width={50} height={50}/>
          )
    }
  
}
export default ProfilePicture
import { useAppContext } from '../context/appContext'
import { Link } from 'react-router-dom'
import male from '../assets/images/male_propic.svg'
import female from '../assets/images/female_propic.svg'

const ProfilePicture = () => {
    const { user } = useAppContext()
    if(user.dp && user.dp !== "null"){
        return (
            <Link to="/profile">
                <img src={"http://localhost:3000/uploads/"+user.dp} alt="DP" width={50} height={50} />
            </Link>
        )
    }
    else{
        if (user.gender === 'Female') {
            return (
                <Link to="/profile">
                    <img src={female} alt="DP" width={50} height={50} />
                </Link>
            )
        }
        else {
            return (
                <Link to="/profile">
                    <img src={male} alt="DP" width={50} height={50} />
                </Link>
            )
        }
    }

}
export default ProfilePicture
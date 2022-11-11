import { Outlet } from "react-router-dom"
import { Navbar } from "../../components"

const SharedLayout = () => {
  return (
    <div>
        <Navbar />
        <div>
        <Outlet />
        </div>
    </div>
  )
}
export default SharedLayout
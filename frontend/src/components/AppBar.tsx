import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"

const AppBar = () => {
  return (
    <div className="border-b flex justify-between px-10 p-4">
      <Link to={"/blogs"}>
      <div className="flex flex-col justify-center text-lg cursor-pointer font-medium">
        Medium
      </div>
      </Link>
      <div>
        <Avatar name="Sagar" size="big" />
      </div>
    </div>
  )
}

export default AppBar

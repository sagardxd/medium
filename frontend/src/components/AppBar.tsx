import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"

const AppBar = () => {
  return (
    <div className="border-b flex justify-between px-10 py-3.5">
      <Link to={"/blogs"}>
        <div className="flex flex-col justify-center h-full text-lg cursor-pointer font-medium">
          Medium
        </div>
      </Link>
      <div>
        <Link to={"/publish"}>
          <button type="button" className="text-white mr-4 bg-green-500 hover:bg-green-800 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">New</button>
        </Link>
        <Avatar name="Sagar" size="big" />
      </div>
    </div>
  )
}

export default AppBar

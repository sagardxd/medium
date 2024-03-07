import { Avatar } from "./BlogCard"

const AppBar = () => {
  return (
    <div className="border-b flex justify-between px-10 p-4">
      <div className="flex flex-col justify-center text-lg">
      Medium
      </div>
      <div>
      <Avatar name="Sagar" size="big"/>
      </div>
    </div>
  )
}

export default AppBar

import { useBlog } from "../hooks"
import { useParams } from "react-router-dom"

import SingleBlog from "../components/SingleBlog"
import BlogSkeleton from "../components/BlogSkeleton";
import AppBar from "../components/AppBar";

const Blog = () => {
  const { id } = useParams();
  const {loading, blog} = useBlog({
    id: id || ""
  })

  if (loading || !blog) {
    return <div className="flex flex-col justify-center">
     <AppBar/>
     <div className="">
      <BlogSkeleton/>
     </div>
    </div>
  }

  return (
    <div>
      <SingleBlog blog={blog}/>
    </div>
  )
}

export default Blog

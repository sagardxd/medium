import AppBar from "../components/AppBar"
import BlogCard from "../components/BlogCard"
import { useBlogs } from "../hooks"

const Blogs = () => {

  const {loading, blogs} = useBlogs();

  if(loading) {
    return <div>
      loading....
    </div>
  }

  return (
    <div>
      <AppBar />
      <div className="flex justify-center">
        <div className="">
          {blogs.map(blog =>   <BlogCard
            id={blog.id}
            authorName={blog.author.name}
            title={blog.title}
            content={blog.content}
            publishedDate={"Mar 5,2024"} /> )}

        
        </div>
      </div>
    </div>
  )
}

export default Blogs

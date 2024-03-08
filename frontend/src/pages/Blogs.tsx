import AppBar from "../components/AppBar"
import BlogCard from "../components/BlogCard"
import BlogSkeleton from "../components/BlogSkeleton";
import { useBlogs } from "../hooks"

const Blogs = () => {

  const {loading, blogs} = useBlogs();

  if (loading) {
    return <div className="flex flex-col justify-center">
     <AppBar/>
     <div className="">
      <BlogSkeleton/>
      <BlogSkeleton/>
      <BlogSkeleton/>
      <BlogSkeleton/>
     </div>
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

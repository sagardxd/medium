import AppBar from "../components/AppBar"
import BlogCard from "../components/BlogCard"

const Blogs = () => {
  return (
    <div>
      <AppBar/>
    <div className="flex justify-center">
      <div className="max-w-lg">
      <BlogCard 
          authorName={"Sagar"}
          title={"Will Sagar to Japan for his Interndfsafffffff"}
          content={"Obviously he will congo to Obviously he will congo to Obviously he will congo to Obviously he will congo to Obviously he will congo to"}
          publishedDate={"Mar 5,2024"} />
    </div>
    </div>
    </div>
  )
}

export default Blogs

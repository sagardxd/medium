import { BrowserRouter, Routes, Route } from "react-router-dom"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import Blog from "./pages/Blog"
import LandingPage from './pages/LandingPage'
import Blogs from "./pages/Blogs"
import { Publish } from "./pages/Publish"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/blog/:id" element={<Blog/>}/>
        <Route path="/blogs" element={<Blogs/>}/>
        <Route path="/publish" element={<Publish/>}/>

      </Routes>
    </BrowserRouter>
  )
}

export default App

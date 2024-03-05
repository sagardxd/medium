import { Link } from "react-router-dom"

const AuthHeader = ({type}:  { type: "signup" | "signin" }) => {
  return (
    <div className="pb-5 px-10">
    <div className="text-3xl font-bold text-center">{type === "signup" ? "Create an Account" : "Login"} </div>
    <p className="text-gray-400 text-md">{type === "signup" ? "Already have a account" : "Don't have a account!"}
        <Link to={type === "signup" ? "/signin" : "/signup"}className="underline pl-2">{type === "signup" ? "login" : "Signup!"}</Link>
    </p>
</div>
  )
}

export default AuthHeader

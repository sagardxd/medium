import Auth from "../components/Auth"
import Branding from "../components/Branding"

const Signin = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
    <div>
        <Auth type={"signin"}/>
    </div>

    <div className="hidden lg:block">
        <Branding />
    </div>
</div>
  )
}

export default Signin

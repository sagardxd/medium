import { useState } from "react";
import { SigninInput } from "@sagardxd/medium-common";
import AuthHeader from "../components/AuthHeader"
import Branding from "../components/Branding"
import { LabelledInput } from "../components/LabelledInput";

const Signup = () => {

    const [postInputs, setpostInputs] = useState<SigninInput>({
        email: "",
        password: "",
    });

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="h-screen justify-center flex flex-col items-center gap-2">
                <div>
                    <AuthHeader type={"signin"} />
                    <div className="flex flex-col gap-4">
                        <LabelledInput label="Email" placeholder="sagardxd@gmail.com" onChange={(e) => {
                            setpostInputs({
                                ...postInputs,
                                email: e.target.value
                            })
                        }} />
                        <LabelledInput label="Password" placeholder="123456" type={"password"} onChange={(e) => {
                            setpostInputs({
                                ...postInputs,
                                email: e.target.value
                            })
                        }} />
                        <button type="button" className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 
                focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700
                 dark:focus:ring-gray-700 dark:border-gray-700">Sign Up</button>
                    </div>
                </div>
            </div>


            <div className="hidden lg:block">
                <Branding />
            </div>
        </div>
    )
}

export default Signup

import { ArrowLeftIcon } from "@heroicons/react/24/outline"
import { useRef } from "react"
import { Link, useNavigate } from "react-router"
import { supabase } from "../../../supabase/client"

function SignUp() {
    const emailRef = useRef<HTMLInputElement>(null)
    const usernameRef = useRef<HTMLInputElement>(null)
    const displayNameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()

    const handleClick = async () => {
        if (!emailRef.current || !usernameRef.current || !displayNameRef.current || !passwordRef.current) return
        const { data, error } = await supabase.auth.signUp({
            email: emailRef.current.value,
            password: passwordRef.current.value,
            options: {
                data: {
                    username: usernameRef.current.value,
                    displayName: displayNameRef.current.value
                }
            }
        })
        if (error) {
            console.log(error)
        } else {
            console.log('signed up user', data)
            navigate("/")
        }
    }
    return (
        <div className="w-full mt-20 flex flex-col items-center justify-center">
            <Link to="/" className="w-sm flex items-center mb-6 hover:underline"><ArrowLeftIcon className="size-4 stroke-2 mr-1" /> back</Link>
            <div className="bg-gray-100 p-10 rounded-lg w-sm">
                <div className="text-2xl font-bold">Sign up</div>
                <div className="mt-8 flex flex-col gap-4">
                    <input ref={emailRef} type="text" placeholder="email" className="w-full bg-white px-4 py-3 rounded-md" />
                    <input ref={usernameRef} type="text" placeholder="username" className="w-full bg-white px-4 py-3 rounded-md" />
                    <input ref={displayNameRef} type="text" placeholder="display name" className="w-full bg-white px-4 py-3 rounded-md" />
                    <input ref={passwordRef} type="password" placeholder="password" className="w-full bg-white px-4 py-3 rounded-md" />
                </div>
                <button 
                    className="mt-8 py-3 flex items-center hover:cursor-pointer justify-center font-bold rounded-lg w-full bg-gray-200"
                    onClick={() => handleClick()}
                >
                    submit
                </button>
                <div className="flex gap-2 text-xs mt-2">
                    <Link to="/auth/login"><span className="underline">login</span> instead</Link>
                </div>
            </div>
        </div>
    )
}

export default SignUp
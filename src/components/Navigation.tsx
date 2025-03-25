import { Link, useLocation, useNavigate } from "react-router"
import { useEffect, useState } from "react"
import useOutsideClick from "../hooks/useOutsideClick";
import { supabase } from "../supabase/client";

function Navigation() {
    const navigate = useNavigate();
    const location = useLocation();
    const {ref, isActive, setIsActive} = useOutsideClick(true)
    const [user, setUser] = useState<{email: string} | null>(null)

    useEffect(() => {
        if (!location.pathname.includes('search')) {
            setIsActive(false)
        }
        const checkUser = async () => {
            const { data, error } = await supabase.auth.getUser()
            if (error) {
                setUser(null)
            } else {
                setUser({email: data.user.email || ""})
            }
            
        }
        checkUser()
    },[location])

    return (
        <nav>
            <div className="mx-auto max-w-5xl p-4">
                <div className="flex justify-between items-center gap-6">
                    <div className="flex gap-4 w-full">
                        <Link to="home" className="font-bold text-3xl">melist</Link>
                        <input 
                            className={`py-2 px-4 bg-gray-200 rounded-md ${(isActive) ? "w-full" : "w-52"} transition-[width] duration-100`}
                            placeholder="search here" 
                            ref={ref}
                            onSelect={() => {
                                setIsActive(true);
                                navigate("search")
                            }}
                        />
                    </div>
                    {user && (
                        <div className="flex items-center gap-6">
                            <Link to="following">following</Link>
                            <Link to="saved">saved</Link>
                            <Link to="my" className="bg-gray-200 rounded-full size-12" />
                        </div>
                    )}
                    {!user && (
                        <div className="flex items-center gap-8">
                            <Link to="auth/login">login</Link>
                            <Link className="w-16" to="auth/signup">sign up</Link>
                        </div>
                    )}
                    
                </div>
            </div>
        </nav>
    )
}

export default Navigation
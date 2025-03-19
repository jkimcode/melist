import { Link, useLocation, useNavigate } from "react-router"
import { useEffect, useState } from "react"
import useOutsideClick from "../hooks/useOutsideClick";

function Navigation() {
    const navigate = useNavigate();
    const location = useLocation();
    const [expandSearchbar, setExpandSearchbar] = useState(false)
    const {ref, isActive, setIsActive} = useOutsideClick(true)

    useEffect(() => {
        if (!location.pathname.includes('search')) {
            setIsActive(false)
        }
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
                    <div className="flex items-center gap-4">
                        <Link to="saved">saved</Link>
                        <Link to="following">following</Link>
                        <Link to="my" className="bg-gray-200 rounded-full size-12" />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navigation
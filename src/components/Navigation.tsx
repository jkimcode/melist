import { useState } from "react"
import useOutsideClick from "../hooks/useOutsideClick";

function Navigation() {
    // const [searchClicked, setSearchClicked] = useState(false);
    const { ref, isActive, setIsActive } = useOutsideClick(false);
    return (
        <nav>
            <div className="mx-auto max-w-5xl p-4">
                <div className="flex justify-between items-center gap-6">
                    <div className="flex gap-4 w-full">
                        <div className="font-bold text-3xl">melist</div>
                        <input 
                            ref={ref}
                            className={`py-2 px-4 bg-gray-200 rounded-md ${isActive ? "w-full" : "w-52"} transition-[width] duration-100`}
                            placeholder="search here" 
                            onSelect={() => setIsActive(true)}
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <div>saved</div>
                        <div>following</div>
                        <div className="bg-gray-200 rounded-full size-12"></div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navigation
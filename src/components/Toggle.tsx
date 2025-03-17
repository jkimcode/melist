import { useState } from "react"

function Toggle() {
    const [active, setActive] = useState(false)

    return (
        <div 
            className="rounded-full h-8 w-14 bg-gray-300 p-1 flex mt-2"
            onClick={() => setActive(!active)}
        >
            <div className={`transition-[flex] ${active && "flex-auto"} duration-200`} />
            <div className="rounded-full size-6 bg-white" />
        </div>
    )
}

export default Toggle
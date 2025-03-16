import { ArrowRightIcon } from "@heroicons/react/24/outline"
import Melist from "../../components/Melist"
import { useState } from "react"

function Edit() {
    const [page, setPage] = useState("menu")
    return (
        <div className="mx-auto max-w-5xl p-4">
            <div className="flex justify-center">
                <div className="flex flex-col">
                    <div className="font-extrabold text-3xl mt-16 justify-self-start">Edit</div>
                    <div className="mt-4 flex gap-8">
                        <Melist displayMode="edit" />
                        <div className={`bg-gray-100 h-fit p-8 rounded-md items-center w-lg text-lg transition-[width] duration-100`}>
                            <div className="font-medium text-sm">What would you like to do?</div>
                            <div className="flex flex-col gap-2 mt-6">
                                <div 
                                    className="p-6 bg-gray-200 font-semibold text-sm flex justify-between hover:bg-gray-300"
                                    onClick={() => {}}
                                >
                                    <div>Add a product</div>
                                    <ArrowRightIcon className="size-5" />
                                </div>
                                <div className="p-6 bg-gray-200 font-semibold text-sm flex justify-between hover:bg-gray-300">
                                    Customize colors / background
                                    <ArrowRightIcon className="size-5" />
                                </div>
                                <div className="p-6 bg-gray-200 font-semibold text-sm flex justify-between hover:bg-gray-300">
                                    Edit / remove a product
                                    <ArrowRightIcon className="size-5" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Edit
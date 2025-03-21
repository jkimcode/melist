import { ArrowLeftIcon, ClockIcon } from "@heroicons/react/24/outline"
import { Link, Outlet } from "react-router"

function AddProduct() {
    return (
        <div className="p-8 w-full">
            <Link to="/business/products" className="flex items-center hover:underline mb-4">
                <ArrowLeftIcon className="size-4 stroke-2 mr-1" /> back
            </Link>
            <div className="bg-gray-100 rounded-md flex p-6 flex-col gap-8">
                <div>
                    <div className="font-semibold">Product Name</div>
                    <input className="mt-2 bg-gray-200 rounded-lg p-3 text-sm w-72" />
                </div>
                <div>
                    <div className="font-semibold">Add Image</div>
                    <input type="file" className="text-sm mt-2 hover:cursor-pointer" />
                </div>
                <div>
                    <div className="font-semibold">Product Description (optional)</div>
                    <input className="mt-2 bg-gray-200 rounded-lg p-3 text-sm w-72" />
                </div>
                <div>
                    <div className="font-semibold">Product Link (optional)</div>
                    <input className="mt-2 bg-gray-200 rounded-lg p-3 text-sm w-72" />
                </div>
                <div className="flex gap-4 mt-12">
                    <Link to="/12" className="py-3 px-8 bg-gray-200 flex justify-center items-center font-semibold rounded-lg">Add Now</Link>
                    <div className="py-3 px-8 bg-gray-200 flex justify-center items-center font-semibold rounded-lg"><ClockIcon className="size-5 stroke-2 mr-2" /> Schedule</div>
                </div>
            </div>
        </div>
    )
}

export default AddProduct
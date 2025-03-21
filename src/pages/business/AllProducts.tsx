import { PlusIcon } from "@heroicons/react/24/outline"
import { Link } from "react-router"

function AllProducts() {
    const products = [1,2,3,4,5]
    return (
        <div className="p-8 w-full">
            <Link to="/business/add" className="px-4 py-3 w-fit bg-gray-100 rounded-md flex items-center">
                <PlusIcon className="size-4 stroke-2 mr-1" />
                <div className="font-medium">Add New</div>
            </Link>
            <div className="mt-16">
                <div className="flex flex-col">
                    <div className="rounded-t-lg h-8 bg-gray-300" />
                    {products.map(item => (
                        <div key={item} className="flex h-16 border-b-2 border-gray-200 last:border-b-0">
                            <div className="bg-white bg-gray-50 size-14"></div>
                            <div className="bg-gray-100 w-full"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AllProducts
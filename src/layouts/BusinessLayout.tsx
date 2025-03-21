import { Link, Outlet } from "react-router"


function BusinessLayout() {
    return (
        <div className="flex">
            <div className="w-64 p-4 bg-gray-100 h-full fixed flex flex-col justify-between">
                <div>
                    <div className="font-bold text-2xl">
                        melist <span className="font-normal text-xl">business</span>
                    </div>
                    <div className="flex flex-col gap-1 text-lg mt-8">
                        <Link to="products" className="rounded-lg bg-gray-100 hover:bg-gray-200 px-4 py-2">All Products</Link>
                        <Link to="test" className="rounded-lg bg-gray-100 hover:bg-gray-200 px-4 py-2">Launches</Link>
                    </div>
                </div>
                <div>bottom part</div>
            </div>
            <div className="ml-64 w-full">
                <Outlet />
            </div>
        </div>
    )
}

export default BusinessLayout
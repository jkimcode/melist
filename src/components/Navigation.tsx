
function Navigation() {
    return (
        <nav>
            <div className="mx-auto max-w-5xl p-4">
                <div className="flex justify-between items-center">
                    <div className="flex gap-4">
                        <div className="font-bold text-3xl">melist</div>
                        <div className="py-2 px-4 bg-gray-200 rounded-md w-52">search here</div>
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
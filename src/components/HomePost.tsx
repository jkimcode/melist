interface HomePostProps {
    postType: string;
    followingUserId?: string;
    productIds?: string[];
}
function HomePost({ postType, followingUserId, productIds } : HomePostProps) {
    return (
        <div className="bg-gray-100 p-8 w-lg rounded-lg">
            {postType == "followUpdate" && (
                <>
                    <div className="text-2xl"><span className="font-bold">Kylie Jenner</span> updated their list with 1 new product</div>
            
                    <div className="flex flex-col gap-2 mt-4">
                        <div className="flex">
                            <div className="bg-white size-14 rounded-l-md"></div>
                            <div className="bg-gray-200 w-full rounded-r-md"></div>
                        </div>
                    </div>

                    <div className="mt-4">
                        <div className="py-4 w-32 bg-gray-200 flex justify-center items-center font-bold">view all</div>
                    </div>
                </>
            )}
            {postType == "recommendedProducts" && (
                <>
                    <div className="text-2xl">products you might like</div>
                    <div className="flex flex-col gap-2 mt-4">
                        <div className="flex">
                            <div className="bg-white size-14 rounded-l-md"></div>
                            <div className="bg-gray-200 w-full rounded-r-md"></div>
                        </div>
                        <div className="flex">
                            <div className="bg-white size-14 rounded-l-md"></div>
                            <div className="bg-gray-200 w-full rounded-r-md"></div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default HomePost
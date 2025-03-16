import { HeartIcon } from "@heroicons/react/24/outline";
import { ProductDetails } from "../common/types";
import { SetStateAction } from "react";

type hoveredProductSetter = React.Dispatch<SetStateAction<ProductDetails | null>>
interface MelistProps {
    displayMode: string;
    setHoveredProduct?: hoveredProductSetter;
}
function Melist({ displayMode, setHoveredProduct } : MelistProps) {
    if (displayMode == "condensed") return <MelistCondensedView />
    if (displayMode == "profile" && setHoveredProduct) return <MelistProfileView setHovered={setHoveredProduct} />
}

function MelistCondensedView() {
    return (
        <div className="bg-gray-100 p-6 flex flex-col gap-8 rounded-xl w-md">
            {/* header */}
            <div className="flex gap-4">
                <div className="bg-white rounded-full size-12" />
                <div>
                    <div className="font-bold text-xl">Kylie Jenner</div>
                    <div className="text-xs">24 products</div>
                </div>
            </div>

            {/* products */}
            <div>
                {/* featured */}
                <div className="flex flex-col gap-2">
                    <div className="flex">
                        <div className="bg-white size-14 rounded-l-md"></div>
                        <div className="bg-gray-200 w-full rounded-r-md"></div>
                    </div>
                    <div className="flex">
                        <div className="bg-white size-14 rounded-l-md"></div>
                        <div className="bg-gray-200 w-full rounded-r-md"></div>
                    </div>
                    <div className="flex">
                        <div className="bg-white size-14 rounded-l-md"></div>
                        <div className="bg-gray-200 w-full rounded-r-md"></div>
                    </div>
                </div>
            </div>

            {/* buttons */}
            <div className="flex gap-4">
                <div className="py-4 w-full bg-gray-200 flex justify-center items-center font-bold">view all</div>
                <div className="py-4 w-full bg-gray-200 flex justify-center items-center font-bold"><HeartIcon className="size-5 stroke-2" /></div>
            </div>
        </div>
    )   
}

function MelistProfileView({ setHovered } : { setHovered: hoveredProductSetter }) {
    return (
        <div className="bg-gray-100 p-6 flex flex-col gap-8 rounded-xl w-sm">
            {/* header */}
            <div className="flex gap-4">
                <div className="bg-white rounded-full size-12" />
                <div>
                    <div className="font-bold text-xl">Kylie Jenner</div>
                    <div className="text-xs">24 products</div>
                </div>
            </div>

            {/* products */}
            <div>
                {/* featured */}
                <div className="flex flex-col gap-2">
                    <div className="flex" onMouseEnter={() => { setHovered({ productTitle: "product A" }) }}>
                        <div className="bg-white size-14 rounded-l-md"></div>
                        <div className="bg-gray-200 w-full rounded-r-md"></div>
                    </div>
                    <div className="flex" onMouseEnter={() => { setHovered({ productTitle: "product B" }) }}>
                        <div className="bg-white size-14 rounded-l-md"></div>
                        <div className="bg-gray-200 w-full rounded-r-md"></div>
                    </div>
                    <div className="flex" onMouseEnter={() => { setHovered({ productTitle: "product C" }) }}>
                        <div className="bg-white size-14 rounded-l-md"></div>
                        <div className="bg-gray-200 w-full rounded-r-md"></div>
                    </div>
                </div>

                {/* more products */}
                <div className="mt-6">
                    <div className="font-semibold">winter faves</div>
                    <div className="flex flex-col gap-2 mt-2">
                        <div className="flex">
                            <div className="bg-white size-14 rounded-l-md"></div>
                            <div className="bg-gray-200 w-full rounded-r-md"></div>
                        </div>
                        <div className="flex">
                            <div className="bg-white size-14 rounded-l-md"></div>
                            <div className="bg-gray-200 w-full rounded-r-md"></div>
                        </div>
                        <div className="flex">
                            <div className="bg-white size-14 rounded-l-md"></div>
                            <div className="bg-gray-200 w-full rounded-r-md"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* buttons */}
            <div className="flex gap-4">
                <div className="py-4 w-full bg-gray-200 flex justify-center items-center font-bold"><HeartIcon className="size-5 stroke-2" /></div>
            </div>
        </div>
    )   
}

export default Melist
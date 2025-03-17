import { ExclamationCircleIcon, HeartIcon, PlusCircleIcon, PlusIcon } from "@heroicons/react/24/outline";
import { MelistStyles, ProductDetails } from "../common/types";
import { SetStateAction } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router";

type hoveredProductSetter = React.Dispatch<SetStateAction<ProductDetails | null>>
type clickedProductSetter = React.Dispatch<SetStateAction<ProductDetails | null>>;
interface MelistProps {
    displayMode: string;
    setHoveredProduct?: hoveredProductSetter;
    setClickedProduct?: clickedProductSetter;
    styles?: MelistStyles;
}
function Melist({ displayMode, setHoveredProduct, setClickedProduct, styles } : MelistProps) {
    if (displayMode == "condensed") return <MelistCondensedView />
    if (displayMode == "profile" && setHoveredProduct) return <MelistProfileView setHovered={setHoveredProduct} />
    if (displayMode == "my" && setClickedProduct) return <MelistMyView setClicked={setClickedProduct} />
    if (displayMode == "edit" && styles) return <MelistEditView styles={styles} />
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

function MelistMyView({ setClicked } : { setClicked: clickedProductSetter }) {
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
                    <div className="flex" onClick={() => setClicked({ productTitle: "product A" })}>
                        <div className="bg-white size-14 rounded-l-md"></div>
                        <div className="bg-gray-200 w-full rounded-r-md"></div>
                    </div>
                    <div className="flex" onClick={() => setClicked({ productTitle: "product B" })}>
                        <div className="bg-white size-14 rounded-l-md"></div>
                        <div className="bg-gray-200 w-full rounded-r-md"></div>
                    </div>
                    <div className="flex" onClick={() => setClicked({ productTitle: "product C" })}>
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
                <Link to="/edit" className="py-4 w-full bg-gray-200 flex justify-center items-center font-semibold">
                    <PencilSquareIcon className="size-5 mr-1" /> edit
                </Link>
            </div>
        </div>
    )
}

function MelistEditView({ styles } : { styles: MelistStyles}) {
    return (
        <div className={`bg-gray-100 p-6 flex flex-col gap-8 rounded-xl w-sm ${styles?.bgColor}`}>
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
                <div className="outline-dotted py-1 px-2 text-xs mt-2 flex items-center">
                    <ExclamationCircleIcon className="size-4 mr-1" />
                    featured section can have max. of 3 products
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
                <div className="outline-dotted py-1 px-2 text-xs mt-2 flex items-center hover:bg-gray-200">
                    <PlusCircleIcon className="size-4 mr-1" />
                    add new
                </div>

                <div className="outline-dotted py-2 px-2 text-xs mt-6 flex items-center hover:bg-gray-200">
                    <PlusIcon className="size-4 mr-1" />
                    add section
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
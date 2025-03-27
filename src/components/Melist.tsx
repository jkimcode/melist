import { ExclamationCircleIcon, HeartIcon, PlusCircleIcon, PlusIcon } from "@heroicons/react/24/outline";
import { MelistData, MelistStyles, ProductDetails, SectionData, SectionDetails, UserData } from "../common/types";
import { SetStateAction, useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { Link, useSearchParams } from "react-router";
import Product from "./Product";
import { Reorder } from "framer-motion";

type hoveredProductSetter = React.Dispatch<SetStateAction<ProductDetails | null>>
type clickedProductSetter = React.Dispatch<SetStateAction<ProductDetails | null>>;
interface MelistProps {
    melistData?: MelistData; // todo: require this
    userData?: UserData;
    displayMode: string;
    setHoveredProduct?: hoveredProductSetter;
    setClickedProduct?: clickedProductSetter;
    styles?: MelistStyles;
}
function Melist({ melistData, displayMode, setHoveredProduct, setClickedProduct, styles, userData } : MelistProps) {
    if (displayMode == "condensed") return <MelistCondensedView />
    if (displayMode == "profile" && setHoveredProduct && melistData) return <MelistProfileView data={melistData} setHovered={setHoveredProduct} />
    if (displayMode == "my" && setClickedProduct && melistData) return <MelistMyView data={melistData} setClicked={setClickedProduct} />
    if (displayMode == "edit" && styles && melistData && userData) return <MelistEditView user={userData} data={melistData} styles={styles} />
    if (displayMode == "minimized") return <MelistMinimizedView />
}

function MelistCondensedView() {
    // show 3 products
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
                <Link to="/12" className="py-4 w-full bg-gray-200 flex justify-center items-center font-bold">view all</Link>
                <div className="py-4 w-full bg-gray-200 flex justify-center items-center font-bold"><HeartIcon className="size-5 stroke-2" /></div>
            </div>
        </div>
    )   
}

function MelistMinimizedView() {
    const [collapsed, setCollapsed] = useState(true)

    // collapsible 
    return (
        <div 
            className={`bg-gray-100 p-6 flex flex-col gap-8 rounded-xl w-md hover:cursor-pointer transition-[height] ${collapsed ? "h-24" : "h-100"} duration-50`}
            onClick={() => setCollapsed(!collapsed)}
        >
            {collapsed && (
                <div className="flex gap-4">
                    <div className="bg-white rounded-full size-12" />
                    <div>
                        <div className="font-bold text-xl">Kylie Jenner</div>
                        <div className="text-xs">24 products</div>
                    </div>
                </div>
            )}
            {!collapsed && (
                <>
                    {/* equivalent to MelistCondensedView */}
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
                        <Link to="/12" className="py-4 w-full bg-gray-200 flex justify-center items-center font-bold">view all</Link>
                        <div className="py-4 w-full bg-gray-200 flex justify-center items-center font-bold"><HeartIcon className="size-5 stroke-2" /></div>
                    </div>
                </>
            )}
        </div>
    )   
}

function MelistProfileView({ data, setHovered } : { data: MelistData, setHovered: hoveredProductSetter }) {
    // show all products
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
                {data.map(section => (
                     <div className="mt-6">
                        <div className="font-semibold">{section.section_name}</div>
                        <div className="flex flex-col gap-2 mt-2">
                            {section.products.map(product => (
                                <div className="flex" key={product.id}>
                                    <div className="bg-white size-14 rounded-l-md"></div>
                                    <div className="bg-gray-200 w-full rounded-r-md">{product.reaction} hi</div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* buttons */}
            <div className="flex gap-4">
                <div className="py-4 w-full bg-gray-200 flex justify-center items-center font-bold"><HeartIcon className="size-5 stroke-2" /></div>
            </div>
        </div>
    )   
}

function MelistMyView({ data, setClicked } : { data: MelistData, setClicked: clickedProductSetter }) {
    // all products with edit button
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
                {/* more products */}
                {data.map(section => (
                     <div key={section.section_id} className="mt-6 first:mt-0">
                        <div className="font-semibold">{section.section_name}</div>
                        <div className="flex flex-col gap-2 mt-2">
                            {section.products.map(product => (
                                <div key={product.id} className="flex">
                                    <div className="bg-white size-14 rounded-l-md"></div>
                                    <div className="bg-gray-200 w-full rounded-r-md">{product.reaction} hi</div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
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


function MelistEditView({ user, data, styles } : { user: UserData, data: MelistData, styles: MelistStyles}) {
    const [urlParams, setUrlParams] = useSearchParams()
  
    return (
        <div className={`bg-gray-100 p-6 flex flex-col gap-8 rounded-xl w-sm ${styles?.bgColor}`}>
            {/* header */}
            <div className="flex gap-4">
                <div className="bg-white rounded-full size-12" />
                <div>
                    <div className="font-bold text-xl">{user.displayName}</div>
                    <div className="text-xs">24 products</div>
                </div>
            </div>

            {/* products */}
            <div>
                {data.map(section => (<Section key={section.section_name} section={section} />))}
                
                <div 
                    className="outline-dotted py-1 px-2 text-xs mt-2 flex items-center hover:bg-gray-200"
                    onClick={() => setUrlParams(prev => {
                        prev.set("view", "step1")
                        return prev
                    })}
                >
                    <PlusCircleIcon className="size-4 mr-1" />
                    add new
                </div>

                <div 
                    className="outline-dotted py-2 px-2 text-xs mt-6 flex items-center hover:bg-gray-200"
                    onClick={() => setUrlParams(prev => {
                        prev.set("view", "addSection")
                        return prev
                    })}
                >
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

function Section({section} : {section: SectionData}) {
    return (
        <div className="mt-6 first:mt-0">
            <div className="font-semibold mb-2">{section.section_name}</div>
            
            <div className="flex flex-col">
                {/* todo: switch over to dnd-kit for drag between sections */}
                {/* <Reorder.Group axis="y" values={products} onReorder={setProducts}>
                    {products.map(productItem => 
                        <Reorder.Item key={productItem.productTitle} value={productItem}>
                            <Product productTitle={productItem.productTitle} mode="edit" />
                        </Reorder.Item>
                    )}
                </Reorder.Group> */}
                {section.products.map(productItem => (
                    <Product key={productItem.id} product={productItem} mode="edit" />
                ))}
            </div>
            {section.section_name == "" && (
                <div className="outline-dotted py-1 px-2 text-xs mt-2 flex items-center">
                    <ExclamationCircleIcon className="size-4 mr-1" />
                    featured section can have max. of 3 products
                </div>
            )}
        </div>
    )
}

export default Melist
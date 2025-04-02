import { CheckIcon, ExclamationCircleIcon, HeartIcon, PencilIcon, PlusCircleIcon, PlusIcon } from "@heroicons/react/24/outline";
import { FollowedProfile, HomeProfile, MelistData, MelistStyles, ProductData, ProductDetails, SearchResultProfile, SectionData, SectionDetails, UserData } from "../common/types";
import { SetStateAction, useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { Link, useSearchParams } from "react-router";
import Product from "./Product";
import { Reorder } from "framer-motion";
import { fetchProductImageUrl, fetchProfileImageUrl } from "../supabase/storage/storage";

type hoveredProductSetter = React.Dispatch<SetStateAction<ProductData | null>>
type clickedProductSetter = React.Dispatch<SetStateAction<ProductData | null>>;
interface MelistProps {
    melistData?: MelistData; // todo: refactor to include user info
    followedProfile?: FollowedProfile;
    searchResultProfile?: SearchResultProfile;
    discoverProfile?: HomeProfile;
    userData?: UserData | null;
    displayMode: string;
    styles?: MelistStyles;
    isFollowing?: boolean;
    setHoveredProduct?: hoveredProductSetter;
    setClickedProduct?: clickedProductSetter;
    onClickFollow?: () => Promise<void>;
    onClickUnfollow?: () => Promise<void>;
}
function Melist(props : MelistProps) {
    if (props.displayMode == "condensed") 
        return <MelistCondensedView />
    if (props.displayMode == "profile" && props.setHoveredProduct && props.melistData && props.userData && props.onClickFollow && props.onClickUnfollow && props.isFollowing != undefined) 
        return <MelistProfileView user={props.userData} data={props.melistData} setHovered={props.setHoveredProduct} onClickFollow={props.onClickFollow} onClickUnfollow={props.onClickUnfollow} isFollowing={props.isFollowing} />
    if (props.displayMode == "my" && props.setClickedProduct && props.melistData) 
        return <MelistMyView data={props.melistData} setClicked={props.setClickedProduct} />
    if (props.displayMode == "edit" && props.styles && props.melistData && props.userData) 
        return <MelistEditView user={props.userData} data={props.melistData} styles={props.styles} />
    if (props.displayMode == "minimized" && props.followedProfile) 
        return <MelistMinimizedView data={props.followedProfile} />
    if (props.displayMode == "search" && props.searchResultProfile) 
        return <MelistSearchView data={props.searchResultProfile} />
    if (props.displayMode == "home" && props.discoverProfile)
        return <MelistHomeView data={props.discoverProfile} />
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

function MelistMinimizedView({ data } : { data: FollowedProfile }) {
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
                        <div className="font-bold text-xl">{data.displayName}</div>
                        <div className="text-xs">{data.products.length}</div>
                    </div>
                </div>
            )}
            {!collapsed && (
                <>
                    {/* equivalent to MelistCondensedView */}
                    <div className="flex gap-4">
                        <div className="bg-white rounded-full size-12" />
                        <div>
                            <div className="font-bold text-xl">{data.displayName}</div>
                            <div className="text-xs">{data.products.length}</div>
                        </div>
                    </div>

                    {/* products */}
                    <div>
                        {/* featured */}
                        <div className="flex flex-col gap-2">
                            {data.products.map(product => (
                                <div key={product.id} className="flex">
                                    <div className="bg-white size-14 rounded-l-md"></div>
                                    <div className="bg-gray-200 w-full rounded-r-md">{product.product_name}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* buttons */}
                    <div className="flex gap-4">
                        <Link to={`/${data.userId}`} className="py-4 w-full bg-gray-200 flex justify-center items-center font-bold">view all</Link>
                        <div className="py-4 w-full bg-gray-200 flex justify-center items-center font-bold"><HeartIcon className="size-5 stroke-2" /></div>
                    </div>
                </>
            )}
        </div>
    )   
}

interface MelistProfileViewProps { 
    user: UserData, 
    data: MelistData, 
    setHovered: hoveredProductSetter, 
    onClickFollow: () => Promise<void>,
    onClickUnfollow: () => Promise<void>,
    isFollowing: boolean
}
function MelistProfileView({ user, data, setHovered, onClickFollow, onClickUnfollow, isFollowing } : MelistProfileViewProps) {
    // show all products
    return (
        <div className="bg-gray-100 p-6 flex flex-col gap-8 rounded-xl w-sm">
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
                {data.map(section => (
                     <div key={section.section_id} className="mt-6">
                        <div className="font-semibold">{section.section_name}</div>
                        <div className="flex flex-col gap-2 mt-2">
                            {section.products.map(product => (
                                <div className="flex" key={product.id} onMouseEnter={() => { setHovered(product) }}>
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
                <div 
                    className="py-4 w-full bg-gray-200 flex justify-center items-center font-bold hover:cursor-pointer"
                    onClick={() => isFollowing ? onClickUnfollow() : onClickFollow()}>
                    {!isFollowing && <><HeartIcon className="size-5 stroke-2 mr-1" /> follow</>}
                    {isFollowing && <><CheckIcon className="size-5 stroke-2 mr-1" /> following</>}
                </div>
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
                                <div key={product.id} className="flex" onClick={() => setClicked(product)}>
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

function MelistSearchView({ data } : { data: SearchResultProfile }) {
    return (
        <div className="bg-gray-100 p-6 flex flex-col gap-8 rounded-xl w-md">
            {/* header */}
            <div className="flex gap-4">
                <div className="bg-white rounded-full size-12" />
                <div>
                    <div className="font-bold text-xl">{data.displayName}</div>
                    <div className="text-xs">{data.products.length} products</div>
                </div>
            </div>

            {/* products */}
            <div className="flex flex-col gap-2">
                {data.products.slice(0,3).map(product => (
                    <div key={product.product_name} className="flex">
                        <div className="bg-white size-14 rounded-l-md"></div>
                        <div className="bg-gray-200 w-full rounded-r-md">{product.product_name}</div>
                    </div>
                ))}
            </div>

            {/* buttons */}
            <div className="flex gap-4">
                <Link to={`/${data.userId}`} className="py-4 w-full bg-gray-200 flex justify-center items-center font-bold">view all</Link>
                <div className="py-4 w-full bg-gray-200 flex justify-center items-center font-bold"><HeartIcon className="size-5 stroke-2" /></div>
            </div>
        </div>
    )   
}

function MelistHomeView({ data } : { data: HomeProfile }) {
    return (
        <div className="bg-gray-100 p-6 flex flex-col gap-8 rounded-xl w-md">
            {/* header */}
            <div className="flex gap-4">
                <div className="bg-white rounded-full size-12" />
                <div>
                    <div className="font-bold text-xl">{data.displayName}</div>
                    <div className="text-xs">{data.products.length} products</div>
                </div>
            </div>

            {/* products */}
            <div className="flex flex-col gap-2">
                {data.products.slice(0,3).map(product => (
                    <div key={product.product_name} className="flex">
                        <div className="bg-white size-14 rounded-l-md"></div>
                        <div className="bg-gray-200 w-full rounded-r-md">
                            {product.product_name}
                            {product.tags?.map(tag => <div key={tag.tag_id}>{product.product_name}</div>)}
                        </div>
                    </div>
                ))}
            </div>

            {/* buttons */}
            <div className="flex gap-4">
                <Link to={`/${data.userId}`} className="py-4 w-full bg-gray-200 flex justify-center items-center font-bold">view all</Link>
                <div className="py-4 w-full bg-gray-200 flex justify-center items-center font-bold"><HeartIcon className="size-5 stroke-2" /></div>
            </div>
        </div>
    )   
}


function MelistEditView({ user, data, styles } : { user: UserData, data: MelistData, styles: MelistStyles}) {
    const [urlParams, setUrlParams] = useSearchParams()
  
    return (
        <div className={`bg-gray-100 p-6 flex flex-col gap-8 rounded-xl w-sm ${styles?.bgColor}`}>
            {/* header */}
            <div 
                className="flex gap-4 hover:cursor-pointer group" 
                onClick={() =>  setUrlParams(prev => {
                    prev.set("view", "editprofile")
                    return prev
                })}>
                <img src={fetchProfileImageUrl(user.userId)} className="bg-white rounded-full size-12 object-fit" />
                <div className="w-full flex justify-between items-center">
                    <div>
                        <div className="font-bold text-xl">{user.displayName}</div>
                        <div className="text-xs">24 products</div>
                    </div>
                    <div className="hidden group-hover:block">
                        <PencilIcon className="size-4 stroke-2" />
                    </div>
                    
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

const countProducts = (melist: MelistData) => {
    let cnt = 0
    melist.forEach(section => section.products.forEach(product => { cnt = cnt+1 }))
    return cnt
}

export default Melist
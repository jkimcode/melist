import { CheckIcon, ExclamationCircleIcon, HeartIcon, PencilIcon, PlusCircleIcon, PlusIcon } from "@heroicons/react/24/outline";
import { CondensedProfile, HomeProfile, MelistData, MelistStyles, ProductData, ProductDetails, SectionData, SectionDetails, UserData } from "../../common/types";
import { SetStateAction, useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { Link, useSearchParams } from "react-router";
import Product from "./Product";
import { Reorder } from "framer-motion";
import { fetchProductImageUrl, fetchProfileImageUrl } from "../../supabase/storage/storage";
import { EditableSection, Section } from "./Section";

type hoveredProductSetter = React.Dispatch<SetStateAction<ProductData | null>>
type clickedProductSetter = React.Dispatch<SetStateAction<ProductData | null>>;
interface MelistProps {
    melistData?: MelistData; // todo: refactor to include user info
    condensedProfile?: CondensedProfile;
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
    if (props.displayMode == "profile" && props.setHoveredProduct && props.melistData && props.userData && props.onClickFollow && props.onClickUnfollow && props.isFollowing != undefined) 
        return <MelistProfileView user={props.userData} data={props.melistData} setHovered={props.setHoveredProduct} onClickFollow={props.onClickFollow} onClickUnfollow={props.onClickUnfollow} isFollowing={props.isFollowing} />
    if (props.displayMode == "my" && props.userData && props.setClickedProduct && props.melistData) 
        return <MelistMyView user={props.userData} data={props.melistData} setClicked={props.setClickedProduct} />
    if (props.displayMode == "edit" && props.styles && props.melistData && props.userData) 
        return <MelistEditView user={props.userData} data={props.melistData} styles={props.styles} />
    if (props.displayMode == "minimized" && props.condensedProfile) 
        return <MelistMinimizedView data={props.condensedProfile} />
    if (props.displayMode == "search" && props.condensedProfile) 
        return <MelistSearchView data={props.condensedProfile} />
    if (props.displayMode == "home" && props.condensedProfile)
        return <MelistHomeView data={props.condensedProfile} />
}

function MelistMinimizedView({ data } : { data: CondensedProfile }) {
    const [collapsed, setCollapsed] = useState(true)

    // collapsible 
    return (
        <div 
            className={`bg-gray-100 p-6 flex flex-col gap-8 rounded-xl w-md hover:cursor-pointer transition-[height] ${collapsed ? "h-24" : "h-100"} duration-50`}
            onClick={() => setCollapsed(!collapsed)}
        >
            {collapsed && (
                <Header displayName={data.displayName} numProducts={data.products.length} />
            )}
            {!collapsed && (
                <>
                    {/* equivalent to MelistCondensedView */}
                    <Header displayName={data.displayName} numProducts={data.products.length} />

                    {/* products */}
                    <div>
                        {/* featured */}
                        <div className="flex flex-col gap-2">
                            {data.products.map(product => <Product mode="condensed" condensedProduct={product} />)}
                        </div>
                    </div>

                    {/* buttons */}
                    <div className="flex gap-4">
                        <Link to={`/${data.userId}`} className="py-4 w-full bg-gray-200 flex justify-center items-center font-bold">view all</Link>
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
            <Header displayName={user.displayName} numProducts={countProducts(data)} />

            {/* products */}
            <div>
                {data.map(section => <Section section={section} />)}
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

function MelistMyView({ user, data, setClicked } : { user: UserData, data: MelistData, setClicked: clickedProductSetter }) {
    // all products with edit button
    return (
        <div className="bg-gray-100 p-6 flex flex-col gap-8 rounded-xl w-sm">
            {/* header */}
            <Header displayName={user.displayName} numProducts={countProducts(data)} />

            {/* products */}
            <div>
                {/* more products */}
                {data.map(section => <Section section={section} />)}
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

function MelistSearchView({ data } : { data: CondensedProfile }) {
    return (
        <div className="bg-gray-100 p-6 flex flex-col gap-8 rounded-xl w-md">
            {/* header */}
            <Header displayName={data.displayName} numProducts={data.products.length} />

            {/* products */}
            <div className="flex flex-col gap-2">
                {data.products.slice(0,3).map(product => <Product mode="condensed" condensedProduct={product} />)}
            </div>

            {/* buttons */}
            <div className="flex gap-4">
                <Link to={`/${data.userId}`} className="py-4 w-full bg-gray-200 flex justify-center items-center font-bold">view all</Link>
                <div className="py-4 w-full bg-gray-200 flex justify-center items-center font-bold"><HeartIcon className="size-5 stroke-2" /></div>
            </div>
        </div>
    )   
}

function MelistHomeView({ data } : { data: CondensedProfile }) {
    return (
        <div className="bg-gray-100 p-6 flex flex-col gap-8 rounded-xl w-md">
            {/* header */}
            <Header displayName={data.displayName} numProducts={data.products.length} />

            {/* products */}
            <div className="flex flex-col gap-2">
                {data.products.slice(0,3).map(product => <Product mode="preview" condensedProduct={product} />)}
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
                {data.map(section => (<EditableSection key={section.section_name} section={section} />))}
                
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

interface HeaderProps {
    imageUrl?: string 
    displayName: string 
    numProducts: number
}
function Header(props: HeaderProps) {
    return (
        <div className="flex gap-4">
            {props.imageUrl ? 
                <img src={props.imageUrl} className="rounded-full size-12 object-fit" /> :
                <div className="bg-white rounded-full size-12" />}
            <div>
                <div className="font-bold text-xl">{props.displayName}</div>
                <div className="text-xs">{props.numProducts} products</div>
            </div>
        </div>
    )
}

const countProducts = (melist: MelistData) => {
    let cnt = 0
    melist.forEach(section => section.products.forEach(product => { cnt = cnt+1 }))
    return cnt
}

export default Melist
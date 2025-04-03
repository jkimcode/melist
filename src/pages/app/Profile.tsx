import { useEffect, useState } from "react"
import Melist from "../../components/melist/Melist"
import { ProductData, ResponseFetchProductUserSave, UserData } from "../../common/types"
import useFetchMelist from "../../hooks/useFetchMelist";
import { useParams, useSearchParams } from "react-router";
import useFetchUser from "../../hooks/useFetchUser";
import { fetchProductUserSaves, uploadProductUserSave } from "../../supabase/api/m_product_user_save";
import { fetchSessionuser } from "../../supabase/api/user";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import useFollow from "../../hooks/useFollow";
import { SelectedView } from "./MyProfile";
import { supabase } from "../../supabase/client";

function Profile() {
    const [hoveredProduct, setHoveredProduct] = useState<ProductData | null>(null);
    const [urlParams, setUrlParams] = useSearchParams()

    // profile user
    let  { identity } = useParams()
    const [userId, setUserId] = useState<string>()
    const { listData, isFetching } = useFetchMelist(userId, false)
    const { userData } = useFetchUser(userId, false)

    // session user
    const [sessionUser, setSessionUser] = useState<UserData | null>(null)
    const { followSrcUser, 
            unfollowSrcUser, 
            isFollowingSrcUser } = useFollow( sessionUser?.userId, userId )

    // products in list saved by session user
    const [sessionUserSavedProducts, setSessionUserSavedProducts] = 
        useState<ResponseFetchProductUserSave[]>([])

    const onClickSave = async (productId: string) => {
        if (!userData || !userId || !sessionUser) return 
        await uploadProductUserSave({ 
            m_product_id: productId, 
            user_id: sessionUser.userId, 
            src_user_id: userId })
        setSessionUserSavedProducts(prev => {
            prev = [...prev, 
                    { user_id: sessionUser.userId, src_user_id: userId, m_product_id: productId }]
            return prev
        })
    }

    const getUserFromUsername = async () => {
        if (!identity) return
        const { data, error } = await supabase.from("user").select("id").eq("username", identity)
        
        if (error) {
            console.log("error fetch id from username", error)
            return 
        }

        console.log(data)
        setUserId(data[0].id)
    }

    const getSessionUserSavedProucts = async () => {
        if (!userId) return

        const sessionUser = await fetchSessionuser()
        if (!sessionUser) return 
        setSessionUser(sessionUser)

        const success = await fetchProductUserSaves(userId, sessionUser.userId)
        if (!success) return 

        console.log(success)
        setSessionUserSavedProducts(success)
    }

    useEffect(() => {
        // determine if provided string is username or userId
        if (urlParams.get("is_uuid") && identity) {
            console.log("is uuid")
            setUserId(identity)
        } else {
            console.log("is username")
            getUserFromUsername()
        }
        
        getSessionUserSavedProucts()
    },[userId])

    useEffect(() => {
        const initialProductId = urlParams.get("initial")
        if (!initialProductId || !listData) return 
        listData.forEach(section => section.products.forEach(product => {
            if (product.id == initialProductId) {
                setHoveredProduct(product)
            }
        }))
    },[listData])

    return (
        <div className="mx-auto max-w-5xl" onMouseLeave={() => setHoveredProduct(null)}>
            <div className="mt-12 flex justify-center gap-8 items-start">
                {(isFetching || !userId) && <Melist displayMode="loading" large={false} />}
                {(!isFetching && userId) && (
                    <Melist 
                        userData={userData} 
                        melistData={listData} 
                        setHoveredProduct={setHoveredProduct}  
                        displayMode="profile" 
                        onClickFollow={followSrcUser} 
                        onClickUnfollow={unfollowSrcUser}
                        isFollowing={isFollowingSrcUser} />
                )}
                <div className={`bg-gray-100 h-fit p-6 rounded-md ${hoveredProduct ? "w-md" : "w-sm"} transition-[width] duration-100`}>
                    {!hoveredProduct && <div className="pb-8">hover over a product for details...</div>}
                    {hoveredProduct && (
                        <div>
                            <SelectedView product={hoveredProduct} />
                            <div className="mt-16">
                                <div 
                                    className="py-4 w-full bg-gray-200 flex justify-center items-center font-bold hover:cursor-pointer"
                                    onClick={() => onClickSave(hoveredProduct.id)}
                                >
                                    {sessionUserSavedProducts.find(product => product.m_product_id == hoveredProduct.id) ? 
                                        <div className="flex items-center">
                                            <CheckCircleIcon className="size-5 stroke-2 mr-1" /> saved
                                        </div>  
                                        : "save"}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Profile
import { useEffect, useState } from "react"
import Melist from "../../components/Melist"
import { ProductData, ResponseFetchProductUserSave, UserData } from "../../common/types"
import useFetchMelist from "../../hooks/useFetchMelist";
import { useParams } from "react-router";
import useFetchUser from "../../hooks/useFetchUser";
import { fetchProductUserSaves, uploadProductUserSave } from "../../supabase/api/m_product_user_save";
import { fetchSessionuser } from "../../supabase/api/user";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

function Profile() {
    const [hoveredProduct, setHoveredProduct] = useState<ProductData | null>(null);
    
    // profile user
    let  { userId } = useParams()
    const { listData } = useFetchMelist(userId)
    const { userData } = useFetchUser(userId)

    // session user
    const [sessionUser, setSessionUser] = useState<UserData | null>(null)

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
        getSessionUserSavedProucts()
    },[])

    return (
        <div className="mx-auto max-w-5xl" onMouseLeave={() => setHoveredProduct(null)}>
            <div className="mt-12 flex justify-center gap-8">
                <Melist userData={userData} melistData={listData} setHoveredProduct={setHoveredProduct}  displayMode="profile" />
                
                <div className={`bg-gray-100 h-fit p-6 rounded-md ${hoveredProduct ? "w-md" : "w-sm"} transition-[width] duration-100`}>
                    {!hoveredProduct && <div className="pb-8">hover over a product for details...</div>}
                    {hoveredProduct && (
                        <div>
                            <div className="flex gap-2">
                                <div className="px-4 py-1 bg-white rounded-full text-sm">fave</div>
                            </div>
                            <div className="mt-4">
                                <div className="text-2xl font-bold">{hoveredProduct.product_name}</div>
                                <div className="h-30 w-50 bg-white rounded-md mt-4"></div>
                                <div className="mt-4">{hoveredProduct.reaction}</div>
                            </div>
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
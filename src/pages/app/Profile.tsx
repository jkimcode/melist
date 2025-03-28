import { useEffect, useState } from "react"
import Melist from "../../components/Melist"
import { ProductData } from "../../common/types"
import useFetchMelist from "../../hooks/useFetchMelist";
import { useParams } from "react-router";
import useFetchUser from "../../hooks/useFetchUser";

function Profile() {
    const [hoveredProduct, setHoveredProduct] = useState<ProductData | null>(null);
    let  { userId } = useParams()
    const { listData } = useFetchMelist(userId)
    const { userData } = useFetchUser(userId)

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
                                <div className="py-4 w-full bg-gray-200 flex justify-center items-center font-bold">save</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Profile
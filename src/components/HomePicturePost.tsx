import { useEffect, useState } from "react"
import { ProductData } from "../common/types"
import { fetchProductImageUrl } from "../supabase/storage/storage"
import { useNavigate } from "react-router"

interface HomePicturePostProps {
    productDetails: ProductData
}
function HomePicturePost({ productDetails } : HomePicturePostProps) {
    const [imageUrl, setImageUrl] = useState<string | null>(null)
    const navigate = useNavigate()
    const getImage = () => {
        const url = fetchProductImageUrl(productDetails.id)
        if (url) setImageUrl(url)
    }
    useEffect(() => {
        getImage()
    },[])
    return (
        <div 
            className="hover:curosr-pointer" 
            onClick={() => navigate(`/${productDetails.user_id}?initial=${productDetails.id}`)}>
            <img className="h-70 w-100 object-fit rounded-t-lg" src={imageUrl || undefined} />
            <div className="bg-gray-100 rounded-xs h-10 w-100">
                {productDetails.product_name}
            </div>
        </div>
        
    )
}

export function HomePicturePostLoading() {
    return (
        <div className="animate-pulse">
            <div className="h-70 w-100 object-fit rounded-t-lg bg-gray-50"></div>
            <div className="bg-gray-100 rounded-xs h-10 w-100"></div>
        </div>
    )
}

export default HomePicturePost



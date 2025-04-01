import { useEffect, useState } from "react"
import { ProductData } from "../common/types"
import { fetchProductImageUrl } from "../supabase/storage/storage"

interface HomePicturePostProps {
    productDetails: ProductData
}
function HomePicturePost({ productDetails } : HomePicturePostProps) {
    const [imageUrl, setImageUrl] = useState<string | null>(null)
    const getImage = async () => {
        const url = await fetchProductImageUrl(productDetails.id)
        if (url) setImageUrl(url)
    }
    useEffect(() => {
        getImage()
    },[])
    return (
        <div>
            <img className="h-70 w-100 object-fit" src={imageUrl} />
            <div className="bg-gray-100 rounded-xs h-10 w-100">
                {productDetails.product_name}
            </div>
        </div>
    )
}

export default HomePicturePost



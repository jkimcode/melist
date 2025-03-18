import { useSearchParams } from "react-router"

function Product({ productTitle } : { productTitle: string }) {
    const [urlParams, setUrlParams] = useSearchParams()
    return (
        <div className="flex mb-2" onClick={() => setUrlParams(prev => {
            prev.set("view", "selected")
            prev.set("productId", "123")
            return prev
        })}>
            <div className="bg-white size-14 rounded-l-md">{productTitle}</div>
            <div className="bg-gray-200 w-full rounded-r-md"></div>
        </div>
    )
}

export default Product
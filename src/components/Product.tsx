import { SetStateAction } from "react";
import { useSearchParams } from "react-router"
import { ProductDetails } from "../common/types";

type hoveredProductSetter = React.Dispatch<SetStateAction<ProductDetails | null>>;
interface ProductProps {
    productTitle: string;
    mode?: string;
    onHover?: hoveredProductSetter;
}
export default function Product({ productTitle, mode, onHover } : ProductProps) {
    if (!mode) return <DefaultMode productTitle={productTitle} />
    if (mode == "edit") return <EditMode productTitle={productTitle} />

    // used in Saved page (not used inside Melist)
    if (mode == "standalone" && onHover) 
        return <HoverMode productTitle={productTitle} onHover={onHover} />
}

function EditMode({ productTitle } : { productTitle: string }) {
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

function DefaultMode({ productTitle } : { productTitle: string }) {
    return (
        <div className="flex mb-2">
            <div className="bg-white size-14 rounded-l-md">{productTitle}</div>
            <div className="bg-gray-200 w-full rounded-r-md"></div>
        </div>
    )
}

//  todo: use this in MelistProfileView
function HoverMode({ productTitle, onHover } : { productTitle: string, onHover: hoveredProductSetter }) {
    return (
        <div className="flex mb-2" onMouseEnter={() => { onHover({ productTitle }) }}>
            <div className="bg-white size-14 rounded-l-md">{productTitle}</div>
            <div className="bg-gray-200 w-full rounded-r-md"></div>
        </div>
    )
}
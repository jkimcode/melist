import { SetStateAction } from "react";
import { useSearchParams } from "react-router"
import { CondensedProduct, ProductData, ProductDetails } from "../../common/types";

type hoveredProductSetter = React.Dispatch<SetStateAction<ProductData | null>>;
interface ProductProps {
    product?: ProductData;
    condensedProduct?: CondensedProduct;
    mode?: string;
    onHover?: hoveredProductSetter;
}
export default function Product({ product, condensedProduct, mode, onHover } : ProductProps) {
    if (!mode && product) return <DefaultMode product={product} />
    if (mode == "edit" && product) return <EditMode product={product} />
    if (mode == "condensed" && condensedProduct) return <CondensedMode condensedProduct={condensedProduct} />
    if (mode == "preview" && condensedProduct) return <PreviewMode product={condensedProduct} />

    // used in Saved page (not used inside Melist)
    if (mode == "standalone" && product && onHover) 
        return <HoverMode product={product} onHover={onHover} />
}

function CondensedMode({ condensedProduct } : { condensedProduct: CondensedProduct }) {
    return (
        <div className="flex mb-2 bg-white runded-md">
            {/* no tags */}
            <div className="text-bold">{condensedProduct.product_name}</div>
        </div>
    )
}

function PreviewMode({ product } : { product: CondensedProduct }) {
    return (
        <div className="flex mb-2 bg-white runded-md">
            {/* todo: display tags */}
            <div className="text-bold">{product.product_name}</div>
        </div>
    )
}

function EditMode({ product } : { product: ProductData }) {
    const [urlParams, setUrlParams] = useSearchParams()
    return (
        <div className="flex mb-2" onClick={() => setUrlParams(prev => {
            prev.set("view", "selected")
            prev.set("productId", product.id)
            return prev
        })}>
            <div className="bg-white size-14 rounded-l-md"></div>
            <div className="bg-gray-200 w-full rounded-r-md">{product.product_name}</div>
        </div>
    )
}

function DefaultMode({ product } : { product: ProductData }) {
    return (
        <div className="flex mb-2 bg-white runded-md">
            <div className="text-bold">{product.product_name}</div>
        </div>
    )
}

//  todo: use this in MelistProfileView
function HoverMode({ product, onHover } : { product: ProductData, onHover: hoveredProductSetter }) {
    return (
        <div className="flex mb-2" onMouseEnter={() => { onHover(product) }}>
            <div className="bg-white size-14 rounded-l-md">{product.product_name}</div>
            <div className="bg-gray-200 w-full rounded-r-md"></div>
        </div>
    )
}
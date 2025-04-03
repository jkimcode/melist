import { SetStateAction } from "react";
import { useSearchParams } from "react-router"
import { CondensedProduct, MelistStyles, ProductData, ProductDetails } from "../../common/types";

type hoveredProductSetter = React.Dispatch<SetStateAction<ProductData | null>>;
type clickedProductSetter = React.Dispatch<SetStateAction<ProductData | null>>
interface ProductProps {
    product?: ProductData;
    condensedProduct?: CondensedProduct;
    mode?: string;
    styles?: MelistStyles;
    onHover?: hoveredProductSetter;
    onClick?: clickedProductSetter
}
export default function Product({ product, condensedProduct, mode, onHover, onClick, styles } : ProductProps) {
    if (!mode && product) return <DefaultMode product={product} />
    if (mode == "edit" && product && styles) return <EditMode product={product} styles={styles} />
    if (mode == "condensed" && condensedProduct) return <CondensedMode condensedProduct={condensedProduct} />
    if (mode == "preview" && condensedProduct) return <PreviewMode product={condensedProduct} />
    if (mode == "click" && product && onClick) return <ClickMode product={product} onClick={onClick} />

    // used in Saved page (not used inside Melist)
    if ((mode == "standalone" || mode == "hover") && product && onHover) 
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
        <div className="p-2 h-16 rounded-sm flex flex-col gap-1 bg-gray-200 mb-2">
            <div className="flex gap-1">
                {product.tags?.map(tag => 
                    <div className="px-2 py-0.5 rounded-full bg-gray-100 text-xs font-medium">{tag.tag_name}
                </div>)}
            </div>
            <div className="font-bold">{product.product_name}</div>
        </div>
    )
}

function EditMode({ product, styles } : { product: ProductData, styles: MelistStyles }) {
    const [urlParams, setUrlParams] = useSearchParams()
    return (
        <div className={`p-2 h-16 rounded-sm flex flex-col gap-1 bg-white mb-2 ${styles.outlineColor} ${styles.productBgColor}`}
            onClick={() => setUrlParams(prev => {
                prev.set("view", "selected")
                prev.set("productId", product.id)
                return prev
        })}>
            <div className="flex gap-1">
                {product.tags?.map(tag => 
                    <div className={`px-2 py-0.5 rounded-full bg-gray-100 text-xs font-medium ${styles.tagColor}`}>{tag.tag_name}
                </div>)}
            </div>
            <div className="font-bold">{product.product_name}</div>
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

function ClickMode({ product, onClick } : { product: ProductData, onClick: hoveredProductSetter }) {
    return (
        <div 
            className="p-2 h-16 rounded-sm flex flex-col gap-1 bg-gray-200 mb-2" 
            onClick={() => { onClick(product) }}>
            <div className="flex gap-1">
                {product.tags?.map(tag => 
                    <div className="px-2 py-0.5 rounded-full bg-gray-100 text-xs font-medium">{
                        tag.tag_name}
                    </div>)}
            </div>
            <div className="font-bold">{product.product_name}</div>
        </div>
        // previous style
        // <div className="flex mb-2 p-2 border-2 rounded-sm bg-white" onClick={() => { onClick(product) }}>
        //     <div className="w-full">{product.product_name}</div>
        //     <div className="ml-2 flex gap-1">
        //         {product.tags?.map(tag => 
        //             <div className="px-2 py-1 rounded-full bg-gray-100 text-xs">{tag.tag_name}
        //         </div>)}
        //     </div>
        // </div>
    )
}
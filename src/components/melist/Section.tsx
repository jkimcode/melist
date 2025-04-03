import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { ProductData, SectionData } from "../../common/types";
import Product from "./Product";
import { SetStateAction } from "react";

interface SectionProps {
    section: SectionData
    mode?: string
    setHovered?: React.Dispatch<SetStateAction<ProductData | null>>
    setClicked?: React.Dispatch<SetStateAction<ProductData | null>>
}
export function Section({section, mode, setHovered, setClicked} : SectionProps) {
    return (
        <div className="mt-6 first:mt-0">
            <div className="font-semibold mb-2">{section.section_name}</div>
            
            <div className="flex flex-col">
                {section.products.map(productItem => {
                    if (mode == "hover") {
                        return <Product key={productItem.id} product={productItem} mode="hover" onHover={setHovered} />
                    }
                    if (mode == "click") {
                        return <Product key={productItem.id} product={productItem} mode="click" onClick={setClicked} />
                    }
                    return <Product key={productItem.id} product={productItem} />
                })}
            </div>
        </div>
    )
}

export function EditableSection({section} : {section: SectionData}) {
    return (
        <div className="mt-6 first:mt-0">
            <div className="font-semibold mb-2">{section.section_name}</div>
            
            <div className="flex flex-col">
                {/* <Reorder.Group axis="y" values={products} onReorder={setProducts}>
                    {products.map(productItem => 
                        <Reorder.Item key={productItem.productTitle} value={productItem}>
                            <Product productTitle={productItem.productTitle} mode="edit" />
                        </Reorder.Item>
                    )}
                </Reorder.Group> */}
                {section.products.map(productItem => (
                    <Product key={productItem.id} product={productItem} mode="edit" />
                ))}
            </div>
            {section.section_name == "" && (
                <div className="outline-dotted py-1 px-2 text-xs mt-2 flex items-center">
                    <ExclamationCircleIcon className="size-4 mr-1" />
                    featured section can have max. of 3 products
                </div>
            )}
        </div>
    )
}
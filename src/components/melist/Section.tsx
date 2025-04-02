import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { SectionData } from "../../common/types";
import Product from "./Product";

export function Section({section} : {section: SectionData}) {
    return (
        <div className="mt-6 first:mt-0">
            <div className="font-semibold mb-2">{section.section_name}</div>
            
            <div className="flex flex-col">
                {section.products.map(productItem => (
                    <Product key={productItem.id} product={productItem} />
                ))}
            </div>
        </div>
    )
}

export function EditableSection({section} : {section: SectionData}) {
    return (
        <div className="mt-6 first:mt-0">
            <div className="font-semibold mb-2">{section.section_name}</div>
            
            <div className="flex flex-col">
                {/* todo: switch over to dnd-kit for drag between sections */}
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
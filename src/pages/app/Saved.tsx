import { Link } from "react-router"
import Product from "../../components/Product"
import { useState } from "react"
import { ProductDetails } from "../../common/types"
import { motion } from "framer-motion"

function Saved() {
    const [hoveredProduct, setHoveredProduct] = useState<ProductDetails | null>(null)
    const products : ProductDetails[] = [{productTitle: "a"},{productTitle: "b"},{productTitle: "c"}]
    return (
        <div className="mx-auto max-w-5xl p-4" onMouseLeave={() => setHoveredProduct(null)}>
            <div className="flex justify-center">
                <div className="flex flex-col">
                    <div className="font-medium text-3xl mt-16 justify-self-start">Saved Products</div>
                    <div className="mt-4 flex gap-8">
                        <div className="flex flex-col w-sm p-6 bg-gray-100 rounded-lg h-fit">
                            {products.map(item => 
                                <Product 
                                    key={item.productTitle} 
                                    productTitle={item.productTitle} 
                                    mode="standalone"
                                    onHover={setHoveredProduct}
                                />
                            )}
                        </div>
                        {!hoveredProduct && (
                            <div className={`bg-gray-100 p-8 rounded-md items-center w-xl text-lg h-fit`}>
                                <div className="pb-8">
                                    <div>Hover over a prodcut to see details...</div>
                                </div>
                            </div>
                        )}
                        {hoveredProduct && (
                            <motion.div 
                                transition={{ type: "spring", bounce: 0, duration: 0.1 }}
                                initial={{ scale: 0.95 }}
                                animate={{ scale: 1 }}
                                key={hoveredProduct.productTitle}
                            >
                                <div className={`bg-gray-100 p-8 rounded-md items-center w-xl text-lg h-fit`}>
                                    <div className="text-sm">
                                        you found this on <Link className="hover:underline" to={"/12"}>@kyeliejenner</Link>
                                    </div>
                                    <div className="mt-4 text-3xl font-bold">Neon Pajamas</div>
                                    <div className="h-30 w-50 bg-white rounded-md mt-4"></div>
                                    <div className="mt-4">{hoveredProduct.productTitle}</div>
                                    <div className="mt-4">Description goes here</div>
                                    <div className="mt-4">product link goes here</div>
                                    <div className="mt-4">stat: N number of people have this product on their list</div>
                                    <div className="flex gap-2">
                                        <div 
                                            className="py-2 px-8 rounded-md mt-12 bg-gray-200 flex justify-center items-center font-medium hover:bg-gray-300"
                                            onClick={() => {}}
                                        >
                                            remove
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>       
        </div>
    )
}

export default Saved
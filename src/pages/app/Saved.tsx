import { Link } from "react-router"
import Product from "../../components/Product"
import { useEffect, useState } from "react"
import { ProductData, ProductDetails } from "../../common/types"
import { motion } from "framer-motion"
import useFetchMelist from "../../hooks/useFetchMelist"
import { fetchProductUserSaves } from "../../supabase/api/m_product_user_save"
import useFetchUser from "../../hooks/useFetchUser"
import { fetchProductById } from "../../supabase/api/m_product"
import { fetchUser } from "../../supabase/api/user"

function Saved() {
    const [hoveredProduct, setHoveredProduct] = useState<ProductData | null>(null)
    const { userData } = useFetchUser()
    const [savedProducts, setSavedProducts] = useState<ProductData[]>([])

    // product id to src username (owner)
    const [productToSrc, setProductToSrc] = 
        useState<{productId: string, srcUsername: string | null}[]>([])

    const getSavedProducts = async () => {
        if (!userData || userData.userId == "") return

        const success = await fetchProductUserSaves(userData.userId)

        if (!success) return  

        // fetch matching products
        const products: ProductData[] = []
        for (let i = 0; i < success.length; i++) {
            const save = success[i]
            const productId = save.m_product_id

            const product = await fetchProductById(productId)
            if (product) products.push(product)
        }

        setSavedProducts(products)

        // fetch source usernames
        const pts = []
        for (let i = 0; i < products.length; i++) {
            const product = products[i]
            const srcUserId = product.user_id
            const user = await fetchUser(srcUserId)
            if (!user) pts.push({productId: product.id, srcUsername: null})
            else pts.push({productId: product.id, srcUsername: user.username})
        }

        setProductToSrc(pts)
    }

    useEffect(() => {
        getSavedProducts()
    },[userData.userId])

    return (
        <div className="mx-auto max-w-5xl p-4" onMouseLeave={() => setHoveredProduct(null)}>
            <div className="flex justify-center">
                <div className="flex flex-col">
                    <div className="font-medium text-3xl mt-16 justify-self-start">Saved Products</div>
                    <div className="mt-4 flex gap-8">
                        <div className="flex flex-col w-sm p-6 bg-gray-100 rounded-lg h-fit">
                            {savedProducts.map(item => 
                                <Product 
                                    key={item.id} 
                                    product={item}
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
                                key={hoveredProduct.id}
                            >
                                <div className={`bg-gray-100 p-8 rounded-md items-center w-xl text-lg h-fit`}>
                                    <div className="text-sm">
                                        you found this on @
                                        <Link className="hover:underline" to={"/12"}>
                                            {productToSrc.find(item => item.productId == hoveredProduct.id)?.srcUsername}
                                        </Link>
                                    </div>
                                    <div className="mt-4 text-3xl font-bold">{hoveredProduct.product_name}</div>
                                    <div className="h-30 w-50 bg-white rounded-md mt-4"></div>
                                    <div className="mt-4">{hoveredProduct.product_name}</div>
                                    <div className="mt-4">Description goes here: {hoveredProduct.reaction}</div>
                                    <div className="mt-4">product link goes here: {hoveredProduct.product_link}</div>
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
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline"
import Melist from "../../components/Melist"
import { SetStateAction, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PlusCircleIcon } from "@heroicons/react/16/solid"

function Edit() {
    const [page, setPage] = useState("menu")
    const [selectedProductId, setSelectedProductId] = useState(0)

    return (
        <div className="mx-auto max-w-5xl p-4">
            <div className="flex justify-center">
                <div className="flex flex-col">
                    <div className="font-extrabold text-3xl mt-16 justify-self-start">Edit</div>
                    <div className="mt-4 flex gap-8">
                        <Melist displayMode="edit" />
                        <div className={`bg-gray-100 h-fit p-8 rounded-md items-center w-xl text-lg transition-[width] duration-100`}>
                            {page == "menu" && (
                                <>
                                    <div className="font-medium text-sm">What would you like to do?</div>
                                    <div className="flex flex-col gap-2 mt-6">
                                        <div 
                                            className="p-6 bg-gray-200 font-semibold text-sm flex justify-between hover:bg-gray-300"
                                            onClick={() => {setPage("product")}}
                                        >
                                            <div>Add a product</div>
                                            <ArrowRightIcon className="size-5" />
                                        </div>
                                        <div className="p-6 bg-gray-200 font-semibold text-sm flex justify-between hover:bg-gray-300">
                                            Customize colors / background
                                            <ArrowRightIcon className="size-5" />
                                        </div>
                                        <div className="p-6 bg-gray-200 font-semibold text-sm flex justify-between hover:bg-gray-300">
                                            Edit / remove a product
                                            <ArrowRightIcon className="size-5" />
                                        </div>
                                    </div>  
                                </>
                            )}

                            {/* need separate AnimationPresence for each view */}
                            {page == "product" && (
                                <AnimatePresence>
                                    <motion.div 
                                        transition={{ type: "spring", duration: 0.1, bounce: 0 }}
                                        initial={{ x: -10 }}
                                        animate={{ x: 0 }}
                                        exit={{ x: -10 }}
                                    >
                                        <ProductView setPage={setPage} setProduct={setSelectedProductId} />
                                    </motion.div>
                                </AnimatePresence>
                            )}
                            {page == "addProduct" && (
                                <AnimatePresence>
                                    <motion.div 
                                        transition={{ type: "spring", duration: 0.1, bounce: 0 }}
                                        initial={{ x: -10 }}
                                        animate={{ x: 0 }}
                                        exit={{ x: -10 }}
                                    >
                                        {page == "addProduct" && <AddProductView setPage={setPage} />}
                                    </motion.div>
                                </AnimatePresence>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface ProductViewProps {
    setPage: React.Dispatch<SetStateAction<string>>;
    setProduct: React.Dispatch<SetStateAction<number>>; 
}
function ProductView({ setPage, setProduct } : ProductViewProps ) {
    return (
        <div>
            <input className="py-2 px-3 bg-gray-200 rounded-md text-sm w-full mb-8" placeholder="search for brands, products etc...." />
            <div className="text-sm font-semibold mb-4">Search results for "pajamas"</div>
            <div className="grid grid-cols-4 gap-4">
                <ProductItemPreview id={1} setPage={setPage} setProduct={setProduct} />
                <ProductItemPreview id={2} setPage={setPage} setProduct={setProduct} />
                <ProductItemPreview id={3} setPage={setPage} setProduct={setProduct} />
                <ProductItemPreview id={4} setPage={setPage} setProduct={setProduct} />
                <ProductItemPreview id={5} setPage={setPage} setProduct={setProduct} />
            </div>
            <div 
                className="py-2 w-32 rounded-md mt-12 bg-gray-200 flex justify-center items-center font-medium hover:bg-gray-300"
                onClick={() => setPage("menu")}
            >
                <ArrowLeftIcon className="size-4 stroke-2 mr-1" /> back
            </div>
        </div>
    )
}

interface AddProductViewProps {
    setPage: React.Dispatch<SetStateAction<string>>;
}
function AddProductView({ setPage } : AddProductViewProps) {
    return (
        <div>
            <div 
                className="py-2 w-32 rounded-md mt-12 bg-gray-200 flex justify-center items-center font-medium hover:bg-gray-300"
                onClick={() => setPage("product")}
            >
                <ArrowLeftIcon className="size-4 stroke-2 mr-1" /> back
            </div>
        </div>
    )
}

interface ProductItemPreviewProps {
    id: number;
    setPage: React.Dispatch<SetStateAction<string>>;
    setProduct: React.Dispatch<SetStateAction<number>>; 
}
function ProductItemPreview({ id, setPage, setProduct } : ProductItemPreviewProps) {
    const clickHandler = () => {
        setPage("addProduct")
        setProduct(id)
    }
    return (
        <div className="flex flex-col">
            <div className="bg-white rounded-t-md h-24" />
            <div className="bg-gray-200 rounded-b-xs h-8 relative">
                <button 
                    className="bg-white absolute -right-2 -top-2 rounded-full"
                    onClick={() => clickHandler()}
                >
                    <PlusCircleIcon className="size-6  hover:fill-gray-500" />
                </button>
            </div>
        </div>
    )
}

export default Edit
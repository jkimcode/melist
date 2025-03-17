import { ArrowLeftIcon, ArrowRightIcon, ClockIcon } from "@heroicons/react/24/outline"
import Melist from "../../components/Melist"
import { SetStateAction, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PlusCircleIcon } from "@heroicons/react/16/solid"
import Toggle from "../../components/Toggle"
import { useSearchParams } from "react-router"
import { SetURLSearchParams } from "react-router"

function Edit() {
    const [page, setPage] = useState("menu")
    const [selectedProductId, setSelectedProductId] = useState(0)
    const [urlParams, setUrlParams] = useSearchParams()

    return (
        <div className="mx-auto max-w-5xl p-4">
            <div className="flex justify-center">
                <div className="flex flex-col">
                    <div className="font-extrabold text-3xl mt-16 justify-self-start">Edit</div>
                    <div className="mt-4 flex gap-8">
                        <Melist displayMode="edit" />
                        <div className={`bg-gray-100 h-fit p-8 rounded-md items-center w-xl text-lg transition-[width] duration-100`}>
                            {urlParams.get("view") == undefined && (
                                <>
                                    <div className="font-medium text-sm">What would you like to do?</div>
                                    <div className="flex flex-col gap-2 mt-6">
                                        <div 
                                            className="p-6 bg-gray-200 font-semibold text-sm flex justify-between hover:bg-gray-300"
                                            onClick={() => {setUrlParams((prev) => { 
                                                prev.set("view", "product") 
                                                return prev
                                            } )}}
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
                            {urlParams.get("view") == "product" && (
                                <AnimatePresence>
                                    <motion.div 
                                        transition={{ type: "spring", duration: 0.1, bounce: 0 }}
                                        initial={{ x: -10 }}
                                        animate={{ x: 0 }}
                                        exit={{ x: -10 }}
                                    >
                                        <ProductView setUrlParams={setUrlParams} />
                                    </motion.div>
                                </AnimatePresence>
                            )}
                            {urlParams.get("view") == "addProduct" && (
                                <AnimatePresence>
                                    <motion.div 
                                        transition={{ type: "spring", duration: 0.1, bounce: 0 }}
                                        initial={{ x: -10 }}
                                        animate={{ x: 0 }}
                                        exit={{ x: -10 }}
                                    >
                                        <AddProductView setUrlParams={setUrlParams} />
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
    setUrlParams: SetURLSearchParams;
}
function ProductView({ setUrlParams } : ProductViewProps ) {
    return (
        <div>
            <input className="py-2 px-3 bg-gray-200 rounded-md text-sm w-full mb-8" placeholder="search for brands, products etc...." />
            <div className="text-sm font-semibold mb-4">Search results for "pajamas"</div>
            <div className="grid grid-cols-4 gap-4">
                <ProductItemPreview id={1} setUrlParams={setUrlParams} />
                <ProductItemPreview id={2} setUrlParams={setUrlParams} />
                <ProductItemPreview id={3} setUrlParams={setUrlParams} />
                <ProductItemPreview id={4} setUrlParams={setUrlParams} />
                <ProductItemPreview id={5} setUrlParams={setUrlParams} />
            </div>
            <div 
                className="py-2 w-32 rounded-md mt-12 bg-gray-200 flex justify-center items-center font-medium hover:bg-gray-300"
                onClick={() => {
                    setUrlParams(new URLSearchParams())
                }}
            >
                <ArrowLeftIcon className="size-4 stroke-2 mr-1" /> back
            </div>
        </div>
    )
}

interface AddProductViewProps {
    setUrlParams: SetURLSearchParams;
}
function AddProductView({ setUrlParams } : AddProductViewProps) {
    return (
        <div>
            <div className="font-semibold text-sm">great! Let's finalize this entry...</div>
            <div className="mt-4">
                <div className="font-semibold text-3xl">Neon Pajamas</div>
                <div className="mt-8 flex flex-col gap-12">
                    <div>
                        <div>select modifiers</div>
                        <div className="flex gap-2 font-medium mt-2">
                            <div className="px-4 py-1 bg-white rounded-full text-sm flex items-center justify-center">fave</div>
                            <div className="px-4 py-1 bg-white rounded-full text-sm">seasonal</div>
                            <div className="px-4 py-1 bg-white rounded-full text-sm">endorsement</div>
                        </div>
                    </div>
                    <div>
                        <div>your reaction</div>
                        <textarea className="bg-white p-2 text-sm rounded-md w-4/5 mt-2" />
                    </div>
                    <div>
                        <div className="mb-2">include product link?</div>
                        <Toggle />
                    </div>
                </div>
            </div>
            <div className="flex gap-2">
                <div 
                    className="py-2 w-32 rounded-md mt-12 bg-gray-200 flex justify-center items-center font-medium hover:bg-gray-300"
                    onClick={() => setUrlParams(prev => {
                        prev.set("view", "product")
                        return prev
                    })}
                >
                    <ArrowLeftIcon className="size-4 stroke-2 mr-1" /> back
                </div>
                <div 
                    className="py-2 px-6 rounded-md mt-12 bg-gray-200 flex justify-center items-center font-medium hover:bg-gray-300"
                    onClick={() => {}}
                >
                    add now
                </div>
                <div 
                    className="py-2 px-6 rounded-md mt-12 bg-gray-200 flex justify-center items-center font-medium hover:bg-gray-300"
                    onClick={() => {}}
                >
                    <ClockIcon className="size-5 stroke-2 mr-1" /> schedule
                </div>
            </div>
        </div>
    )
}

interface ProductItemPreviewProps {
    id: number;
    setUrlParams: SetURLSearchParams;
}
function ProductItemPreview({ id, setUrlParams } : ProductItemPreviewProps) {
    const clickHandler = () => {
        setUrlParams((prev) => {
            prev.set("view", "addProduct")
            return prev
        })
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
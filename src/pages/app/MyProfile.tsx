import { useEffect, useState } from "react";
import Melist from "../../components/Melist"
import { MelistData, ProductDetails } from "../../common/types";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { ChevronDownIcon, ChevronUpIcon, GlobeAmericasIcon } from "@heroicons/react/24/outline";
import { supabase } from "../../supabase/client";
import { useNavigate } from "react-router";
import useFetchMelist from "../../hooks/useFetchMelist";

function MyProfile() {
    const [clickedProduct, setClickedProduct] = useState<ProductDetails | null>(null);
    const [dropdown, setDropdown] = useState(false)
    const { listData } = useFetchMelist()
    const navigate = useNavigate()

    const logout = async () => {
        localStorage.removeItem("user")
        const { error } = await supabase.auth.signOut()
        navigate('/')
    }
    return (
        <div className="mx-auto max-w-5xl">
            <div className="flex justify-center">
                <div className="flex flex-col">
                    <div className="font-extrabold text-3xl mt-16 justify-self-start">My List</div>
                    <div className="mt-4 flex gap-8">
                        <Melist melistData={listData ? listData : undefined} displayMode="my" setClickedProduct={setClickedProduct} />
                        <div className="flex flex-col">
                            <div className={`bg-gray-100 h-fit p-6 rounded-md items-center ${clickedProduct ? "w-md" : "w-sm"} text-lg transition-[width] duration-100`}>
                                {!clickedProduct && (
                                    <div className="flex items-center font-semibold">
                                        <GlobeAmericasIcon className="size-6 mr-2" /> melist.com/kyliejenner
                                    </div>
                                )}
                                {clickedProduct && (
                                    <>
                                        <div className="flex items-center text-sm hover:underline" onClick={() => setClickedProduct(null)}>
                                            <ArrowLeftIcon className="size-4 mr-1" /> back
                                        </div>
                                        <div className="mt-6">
                                            {clickedProduct.productTitle}
                                        </div>
                                    </>
                                )}
                            </div>
                            {!clickedProduct && (
                                <div className={`bg-gray-100 h-fit p-6 rounded-md w-sm  text-lg mt-4`}>
                                    <div className="text-xl">stats</div>
                                    <div className="text-xl flex flex-col gap-2 mt-4">
                                        <div><span className="font-bold">40k</span> visitors</div>
                                        <div><span className="font-bold">17k</span> followers</div>
                                    </div>
                                </div>
                            )}
                            {!clickedProduct && (
                                <div className={`bg-gray-100 h-fit p-6 rounded-md w-sm  text-lg mt-4`}>
                                    <div className=" flex items-center" onClick={() => setDropdown(!dropdown)}>
                                        options {dropdown ? <ChevronUpIcon className="size-5 stroke-2 ml-1" /> : <ChevronDownIcon className="size-5 stroke-2 ml-1" />}
                                    </div>
                                    {dropdown && (
                                        <div className="flex flex-col gap-2 mt-4 text-sm hover:cursor-pointer">
                                            <div>set private</div>
                                            <div onClick={() => logout()}>logout</div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyProfile
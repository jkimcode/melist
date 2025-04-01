import { ArrowLeftIcon, ArrowRightIcon, ClockIcon, PencilSquareIcon } from "@heroicons/react/24/outline"
import Melist from "../../components/Melist"
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PlusCircleIcon } from "@heroicons/react/16/solid"
import Toggle from "../../components/Toggle"
import { useSearchParams } from "react-router"
import { SetURLSearchParams } from "react-router"
import { MelistData, MelistStyles, PostProduct, PostProductTag, ProductData, ResponseTag, TagSelectable } from "../../common/types"
import useFetchMelist from "../../hooks/useFetchMelist"
import { supabase } from "../../supabase/client"
import Spinner from "../../components/icons/spinner"
import { clone } from "../../common/utils"
import useFetchUser from "../../hooks/useFetchUser"
import { updateExistingProduct, uploadProduct } from "../../supabase/api/m_product"
import { fetchProductTags, uploadProductTags } from "../../supabase/api/m_product_tag"
import { fetchUserTags, uploadTag } from "../../supabase/api/tags"
import { fetchSessionuser } from "../../supabase/api/user"
import ImageInput from "../../components/ImageInput"
import { fetchProductImageUrl, uploadProductImage } from "../../supabase/storage/storage"

function Edit() {
    const [urlParams, setUrlParams] = useSearchParams()
    const [styles, setStyles] = useState<MelistStyles>({bgColor: "gray-100"})
    const { listData, populateList } = useFetchMelist()
    const { userData } = useFetchUser() 

    // add product flow
    const [productName, setProductName] = useState<string>("")
    const [tags, setTags] = useState<TagSelectable[]>([])
    const [reaction, setReaction] = useState<string>("")
    const [productLink, setProductLink] = useState<string>("")
    const [productImage, setProductImage] = useState<File>()
    const [sectionId, setSectionId] = useState<string>("")

    const findUrlProduct = () => {
        const productId = urlParams.get("productId")
        let productData: ProductData | null = null

        // search through all sections
        listData.forEach(section => 
            section.products.forEach(product => {
                if (product.id == productId) {
                    productData = product
                }
            }))
        
        return productData
    }
    const onClickUpload = async () => {
        if (!userData) return null

        const postProduct: PostProduct = {
            user_id: userData.userId, 
            reaction, 
            include_link_if_present: true, 
            product_name: productName, 
            section_id: sectionId,
            rank_within_section: "a",
            product_link: productLink
        }
        const postProductResp = await uploadProduct(postProduct)
        if (!postProductResp) return null

        // post product tags using returned product's id
        const postProductTags: PostProductTag[] = tags.map(item => ({ 
            tag_id: item.id, 
            m_product_id: postProductResp.id, 
            user_id: userData.userId 
        }))
        const postProductTagsResp = await uploadProductTags(postProductTags)
        if (!postProductTagsResp) return null

        if (productImage != undefined) {
            await uploadProductImage(productImage, `${postProductResp.id}`)
        }

        return postProductResp.id
    }
    return (
        <div className="mx-auto max-w-5xl p-4">
            <div className="flex justify-center">
                <div className="flex flex-col">
                    <div className="font-extrabold text-3xl mt-16 justify-self-start">Edit</div>
                    <div className="mt-4 flex gap-8">
                        <Melist userData={userData} melistData={listData ? listData : undefined} displayMode="edit" styles={styles} />
                        <div className={`bg-gray-100 h-fit p-8 rounded-md items-center w-xl text-lg transition-[width] duration-100`}>
                            {(urlParams.get("view") == undefined || urlParams.get("view") == "") && (
                                <>
                                    <div className="font-medium text-sm">What would you like to do?</div>
                                    <div className="flex flex-col gap-2 mt-6">
                                        <div 
                                            className="p-6 bg-gray-200 font-semibold text-sm flex justify-between hover:bg-gray-300"
                                            onClick={() => {setUrlParams((prev) => { 
                                                // if at least one user-created section, prompt for choice
                                                if (listData?.length == 1 && listData[0].section_name == "featured") {
                                                    prev.set("view", "step1") 
                                                } else {
                                                    prev.set("view", "step0") 
                                                }
                                                return prev
                                            } )}}>
                                            <div>Add a product</div>
                                            <ArrowRightIcon className="size-5" />
                                        </div>
                                        <div 
                                            className="p-6 bg-gray-200 font-semibold text-sm flex justify-between hover:bg-gray-300"
                                            onClick={() => setUrlParams(prev => {
                                                prev.set("view", "customize")
                                                return prev
                                            })}>
                                            Customize colors / background
                                            <ArrowRightIcon className="size-5" />
                                        </div>
                                        <div 
                                            className="p-6 bg-gray-200 font-semibold text-sm flex justify-between hover:bg-gray-300"
                                            onClick={() => {
                                                const params = new URLSearchParams()
                                                params.set("view", "help")
                                                setUrlParams(params)
                                            }}>
                                            Edit / remove a product
                                            <ArrowRightIcon className="size-5" />
                                        </div>
                                    </div>  
                                </>
                            )}

                            {/* need separate AnimationPresence for each view */}
                            {urlParams.get("view") == "step0" && (
                                <AnimatePresence>
                                    <motion.div 
                                        transition={{ type: "spring", duration: 0.1, bounce: 0 }}
                                        initial={{ x: -10 }}
                                        animate={{ x: 0 }}
                                        exit={{ x: -10 }}>
                                        <Step0View sectionId={sectionId} setSectionId={setSectionId} sections={listData!} setUrlParams={setUrlParams} />
                                    </motion.div>
                                </AnimatePresence>
                            )}
                            {urlParams.get("view") == "step1" && (
                                <AnimatePresence>
                                    <motion.div 
                                        transition={{ type: "spring", duration: 0.1, bounce: 0 }}
                                        initial={{ x: -10 }}
                                        animate={{ x: 0 }}
                                        exit={{ x: -10 }}
                                    >
                                        <Step1View skipStepZero={listData?.length == 1 && listData[0].section_name == "featured"} setProductName={setProductName} setUrlParams={setUrlParams} />
                                    </motion.div>
                                </AnimatePresence>
                            )}
                            {urlParams.get("view") == "step2" && (
                                <AnimatePresence>
                                    <motion.div 
                                        transition={{ type: "spring", duration: 0.1, bounce: 0 }}
                                        initial={{ x: -10 }}
                                        animate={{ x: 0 }}
                                        exit={{ x: -10 }}
                                    >
                                        <Step2View setTags={setTags} setUrlParams={setUrlParams} />
                                    </motion.div>
                                </AnimatePresence>
                            )}
                            {urlParams.get("view") == "step3" && (
                                <AnimatePresence>
                                    <motion.div 
                                        transition={{ type: "spring", duration: 0.1, bounce: 0 }}
                                        initial={{ x: -10 }}
                                        animate={{ x: 0 }}
                                        exit={{ x: -10 }}
                                    >
                                        <Step3View setReaction={setReaction} setUrlParams={setUrlParams} />
                                    </motion.div>
                                </AnimatePresence>
                            )}
                            {urlParams.get("view") == "step4" && (
                                <AnimatePresence>
                                    <motion.div 
                                        transition={{ type: "spring", duration: 0.1, bounce: 0 }}
                                        initial={{ x: -10 }}
                                        animate={{ x: 0 }}
                                        exit={{ x: -10 }}
                                    >
                                        <Step4View productImage={productImage} setProductImage={setProductImage} setUrlParams={setUrlParams} />
                                    </motion.div>
                                </AnimatePresence>
                            )}
                            {urlParams.get("view") == "step5" && (
                                <AnimatePresence>
                                    <motion.div 
                                        transition={{ type: "spring", duration: 0.1, bounce: 0 }}
                                        initial={{ x: -10 }}
                                        animate={{ x: 0 }}
                                        exit={{ x: -10 }}
                                    >
                                        <Step5View populateList={populateList} onClickUpload={onClickUpload} productLink={productLink} setProductLink={setProductLink} setUrlParams={setUrlParams} />
                                    </motion.div>
                                </AnimatePresence>
                            )}
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
                            {urlParams.get("view") == "addSection" && (
                                <AnimatePresence>
                                    <motion.div 
                                        transition={{ type: "spring", duration: 0.1, bounce: 0 }}
                                        initial={{ x: -10 }}
                                        animate={{ x: 0 }}
                                        exit={{ x: -10 }}
                                    >
                                        <AddSectionView populateList={populateList} setUrlParams={setUrlParams} />
                                    </motion.div>
                                </AnimatePresence>
                            )}
                            {urlParams.get("view") == "customize" && (
                                <AnimatePresence>
                                    <motion.div 
                                        transition={{ type: "spring", duration: 0.1, bounce: 0 }}
                                        initial={{ x: -10 }}
                                        animate={{ x: 0 }}
                                        exit={{ x: -10 }}
                                    >
                                        <CustomizeView setUrlParams={setUrlParams} setStyles={setStyles} />
                                    </motion.div>
                                </AnimatePresence>
                            )}
                            {urlParams.get("view") == "selected" && (
                                <AnimatePresence>
                                    <motion.div 
                                        transition={{ type: "spring", duration: 0.1, bounce: 0 }}
                                        initial={{ x: -10 }}
                                        animate={{ x: 0 }}
                                        exit={{ x: -10 }}
                                    >
                                        <SelectedView 
                                            setUrlParams={setUrlParams} 
                                            isNew={urlParams.get("context") == "created"} 
                                            product={findUrlProduct()} />
                                    </motion.div>
                                </AnimatePresence>
                            )}
                            {urlParams.get("view") == "editSelected" && (
                                <AnimatePresence>
                                    <motion.div 
                                        transition={{ type: "spring", duration: 0.1, bounce: 0 }}
                                        initial={{ x: -10 }}
                                        animate={{ x: 0 }}
                                        exit={{ x: -10 }}
                                    >
                                        <EditSelectedView 
                                            setUrlParams={setUrlParams} 
                                            populateList={populateList}
                                            product={findUrlProduct()} />
                                    </motion.div>
                                </AnimatePresence>
                            )}
                            {urlParams.get("view") == "help" && (
                                <AnimatePresence>
                                    <motion.div 
                                        transition={{ type: "spring", duration: 0.1, bounce: 0 }}
                                        initial={{ x: -10 }}
                                        animate={{ x: 0 }}
                                        exit={{ x: -10 }}
                                    >
                                        <HelpView setUrlParams={setUrlParams} />
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

interface Step0ViewProps {
    setUrlParams: SetURLSearchParams;
    sections: MelistData;
    setSectionId: Dispatch<SetStateAction<string>>;
    sectionId: string;
}
function Step0View({ setUrlParams, sections, setSectionId, sectionId } : Step0ViewProps ) {
    return (
        <div>
            <div>
                <div className="font-semibold text-2xl">Select a section for the product</div>
                <div className="mt-8 flex gap-3">
                    {sections?.map(item => (
                        <button 
                            key={item.section_id}
                            className={`p-6 w-fit rounded-sm bg-gray-200 font-semibold text-sm hover:cursor-pointer ${sectionId == item.section_id && "bg-yellow-100"}`}
                            onClick={() => setSectionId(item.section_id)}
                        >
                            {item.section_name}
                        </button>
                    ))}
                </div>
            </div>
            <div className="flex gap-2">
                <div 
                    className="py-2 w-32 rounded-md mt-12 bg-gray-200 flex justify-center items-center font-medium hover:bg-gray-300"
                    onClick={() => setUrlParams(prev => {
                        prev.set("view", "")
                        return prev
                    })}
                >
                    <ArrowLeftIcon className="size-4 stroke-3 mr-1" /> back
                </div>
                <div 
                    className="py-2 w-28 rounded-md mt-12 bg-gray-200 flex justify-center items-center font-medium hover:bg-gray-300"
                    onClick={() => setUrlParams(prev => {
                        prev.set("view", "step1")
                        return prev
                    })}
                >
                    confirm
                </div>
            </div>
        </div>
    )
}

interface Step1ViewProps {
    setProductName: Dispatch<SetStateAction<string>>
    setUrlParams: SetURLSearchParams;
    skipStepZero: boolean;
}
function Step1View({ setProductName, setUrlParams, skipStepZero } : Step1ViewProps ) {
    return (
        <div>
            <div className="font-semibold text-sm">great! first let's gather some info...</div>
            <div className="mt-8">
                <div className="font-semibold text-2xl">What is your product called?</div>
                <input onChange={(e) => setProductName(e.target.value)} className="p-4 mt-4 bg-white w-full rounded-md" placeholder="type here..." />
            </div>
            <div className="flex gap-2">
                <div 
                    className="py-2 w-32 rounded-md mt-12 bg-gray-200 flex justify-center items-center font-medium hover:bg-gray-300"
                    onClick={() => setUrlParams(prev => {
                        if (skipStepZero) prev.set("view", "")
                        else prev.set("view", "step0")
                        
                        return prev
                    })}
                >
                    <ArrowLeftIcon className="size-4 stroke-3 mr-1" /> back
                </div>
                <div 
                    className="py-2 w-28 rounded-md mt-12 bg-gray-200 flex justify-center items-center font-medium hover:bg-gray-300"
                    onClick={() => setUrlParams(prev => {
                        prev.set("view", "step2")
                        return prev
                    })}
                >
                    next
                </div>
            </div>
        </div>
    )
}

interface Step2ViewProps {
    setTags: Dispatch<SetStateAction<TagSelectable[]>>;
    setUrlParams: SetURLSearchParams;
}
function Step2View({ setTags, setUrlParams } : Step2ViewProps ) {
    const [tagOptions, setTagOptions] = useState<TagSelectable[]>([])
    const newTagRef = useRef<HTMLInputElement>(null)
    const addNewTag = async (tagName : string) => {
        const response: ResponseTag | null = await uploadTag(tagName)

        if (!response) return 

        setTagOptions(prev => ([...prev, {id: response.tag_id, 
                        tag_name: response.tag_name, selected: false }]))

        newTagRef.current!.value = ""
    }
    useEffect(() => {
        const fetchTags = async () => {
            const { data: { user } } = await supabase.auth.getUser()

            if (!user) {
                console.log('no user')
                return
            } 

            // user's tags
            let { data: tags, error } = await supabase
                .from('tags').select('*').eq('user_id', user.id)

            if (error) {
                console.log('error fetching tags', error)
                return
            } 

            if (!tags) {
                console.log('no tags')
                return
            }

            console.log(tags)
            const reformatted : TagSelectable[] = tags.map(item => ({ id: item.id, tag_name: item.tag_name, selected: false }))
            setTagOptions(reformatted)
        }
        fetchTags()
    },[])

    return (
        <div>
            <div className="">
                <div className="font-semibold text-2xl">What tags should we include?</div>
                <div className="mt-8">
                    <div className="text-sm font-semibold">choose tags</div>
                    <div className="flex gap-2 font-medium mt-2">
                        {tagOptions?.map((item,i) => (
                            <button 
                                key={item.id}
                                className={`px-4 py-1 bg-white rounded-full text-sm hover:cursor-pointer ${item.selected && "bg-yellow-100"}`}
                                onClick={() => {
                                    const isSelected = item.selected
                                    setTagOptions(prev => {
                                        const updated = [...prev]
                                        updated[i].selected = !isSelected
                                        return updated
                                    })}}
                            >
                                {item.tag_name}
                            </button>
                        ))}
                    </div>
                    <div className="mt-10">
                        <div className="text-sm font-semibold">create new tag</div>
                        <div className="rounded-full bg-white flex w-48 mt-2">
                            <input ref={newTagRef} className="w-32 py-2 px-4 text-sm flex-3 rounded-l-full" placeholder="type here..." />
                            <button 
                                className="bg-gray-200 flex-1 rounded-r-full text-sm px-2 py-1"
                                onClick={() => addNewTag(newTagRef.current!.value)}
                            >
                                add
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-16 flex gap-2">
                <div 
                    className="py-2 w-32 rounded-md mt-12 bg-gray-200 flex justify-center items-center font-medium hover:bg-gray-300"
                    onClick={() => setUrlParams(prev => {
                        prev.set("view", "step1")
                        return prev
                    })}
                >
                    <ArrowLeftIcon className="size-4 stroke-3 mr-1" /> back
                </div>
                <div 
                    className="py-2 w-28 rounded-md mt-12 bg-gray-200 flex justify-center items-center font-medium hover:bg-gray-300"
                    onClick={() => setUrlParams(prev => {
                        setTags(tagOptions.filter(item => item.selected))
                        prev.set("view", "step3")
                        return prev
                    })}
                >
                    next
                </div>
            </div>
        </div>
    )
}


interface Step3ViewProps {
    setReaction: Dispatch<SetStateAction<string>>;
    setUrlParams: SetURLSearchParams;
}
function Step3View({ setReaction, setUrlParams } : Step3ViewProps ) {
    return (
        <div>
            <div className="">
                <div className="font-semibold text-sm">getting there...</div>
                <div className="mt-8">
                    <div className="font-semibold text-2xl">Share your reaction to the product (this is optional)</div>
                    <textarea onChange={(e) => setReaction(e.target.value)} className="p-4 mt-4 bg-white w-full rounded-md text-sm min-h-24" placeholder="type here..." />
                </div>
            </div>
            <div className="mt-16 flex gap-2">
                <div 
                    className="py-2 w-32 rounded-md mt-12 bg-gray-200 flex justify-center items-center font-medium hover:bg-gray-300"
                    onClick={() => setUrlParams(prev => {
                        prev.set("view", "step2")
                        return prev
                    })}
                >
                    <ArrowLeftIcon className="size-4 stroke-3 mr-1" /> back
                </div>
                <div 
                    className="py-2 w-28 rounded-md mt-12 bg-gray-200 flex justify-center items-center font-medium hover:bg-gray-300"
                    onClick={() => setUrlParams(prev => {
                        prev.set("view", "step4")
                        return prev
                    })}
                >
                    next
                </div>
            </div>
        </div>
    )
}

interface Step4ViewProps {
    setUrlParams: SetURLSearchParams;
    productImage: File | undefined;
    setProductImage: Dispatch<SetStateAction<File | undefined>>
}
function Step4View({ setUrlParams, productImage, setProductImage } : Step4ViewProps ) {
    return (
        <div>
            <div className="">
                <div className="">
                    <div className="font-semibold text-2xl">Upload your own photo of the product</div>
                    <div className="mt-4 text-sm">this helps us make your list beautiful</div>
                    <ImageInput image={productImage} setImage={setProductImage} />
                </div>
            </div>
            <div className="mt-16 flex gap-2">
                <div 
                    className="py-2 w-32 rounded-md mt-12 bg-gray-200 flex justify-center items-center font-medium hover:bg-gray-300"
                    onClick={() => setUrlParams(prev => {
                        prev.set("view", "step3")
                        return prev
                    })}
                >
                    <ArrowLeftIcon className="size-4 stroke-3 mr-1" /> back
                </div>
                <div 
                    className="py-2 w-54 rounded-md mt-12 bg-gray-200 flex justify-center items-center font-medium hover:bg-gray-300"
                    onClick={() => setUrlParams(prev => {
                        prev.set("view", "step5")
                        return prev
                    })}
                >
                    {productImage ? "next" : "I don't have a photo"}
                </div>
            </div>
        </div>
    )
}

interface Step5ViewProps {
    onClickUpload: () => Promise<string | null>;
    productLink: string;
    populateList: () => Promise<void>;
    setProductLink: Dispatch<SetStateAction<string>>;
    setUrlParams: SetURLSearchParams;
}
function Step5View({ onClickUpload, productLink, populateList, setProductLink, setUrlParams } : Step5ViewProps ) {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const clickHandler = async () => {
        setIsLoading(true);
        const uploadedProductId = await onClickUpload()
        if (!uploadedProductId) {
            return 
        }

        await populateList()
        setIsLoading(false)
        
        setUrlParams(prev => {
            prev.set("view", "selected")
            prev.set("productId", uploadedProductId)
            prev.set("context", "created")
            return prev
        })
    }
    return (
        <div>
            <div className="">
                <div className="font-semibold text-sm">final step!</div>
                <div className="mt-8">
                    <div className="font-semibold text-xl">Add a link for others to view this product</div>
                    <input 
                        onChange={(e) => {
                            const val = e.target.value
                            setProductLink(val)
                        }}
                        className="py-2 px-4 mt-4 bg-white w-full rounded-md text-sm" placeholder="type here..." 
                    />
                </div>
            </div>
            <div className="mt-16 flex gap-2">
                <div 
                    className="py-2 w-32 rounded-md mt-12 bg-gray-200 flex justify-center items-center font-medium hover:bg-gray-300"
                    onClick={() => setUrlParams(prev => {
                        prev.set("view", "step4")
                        return prev
                    })}
                >
                    <ArrowLeftIcon className="size-4 stroke-3 mr-1" /> back
                </div>
                <div 
                    className="py-2 w-24 rounded-md mt-12 bg-gray-200 flex justify-center items-center font-medium hover:bg-gray-300"
                    onClick={() => clickHandler()}
                >
                    {isLoading && <Spinner />} 
                    {productLink.length > 0 ? "done" : "skip"}
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

interface AddSectionViewProps {
    setUrlParams: SetURLSearchParams;
    populateList: () => Promise<void>;
}
function AddSectionView({ populateList, setUrlParams } : AddSectionViewProps) {
    const [newSectionName, setNewSectionName] = useState<string>("")
    const sectionRef = useRef<HTMLInputElement>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const addNewSection = async () => {
        setIsLoading(true)

        const user = await fetchSessionuser()
        if (!user) return

        console.log("user", user)

        const { data, error } = await supabase.from('m_section').insert([{
            user_id: user.userId,
            section_name: newSectionName
        }]).select()
        

        if (error) {
            console.log('error insert section', error)
            setIsLoading(false)
            return 
        }

        console.log(data)

        await populateList()

        setIsLoading(false)

        setUrlParams(prev => {
            prev.set("view", "")
            return prev
        })
    }
    return (
        <div>
            <div className="font-semibold">Add a new section</div>
            <div className="mt-2">
                <input 
                    ref={sectionRef}
                    onChange={(e) => setNewSectionName(e.target.value)} 
                    className="py-3 px-4 rounded-md w-72 bg-gray-200 text-sm" placeholder="e.g. summer, holidays, bags" />
            </div>
            <div className="flex gap-2">
                <div 
                    className="py-2 w-32 rounded-md mt-12 bg-gray-200 flex justify-center items-center font-medium hover:bg-gray-300"
                    onClick={() => setUrlParams(prev => {
                        prev.set("view", "")
                        return prev
                    })}
                >
                    <ArrowLeftIcon className="size-4 stroke-3 mr-1" /> quit
                </div>
                <div 
                    className="py-2 px-8 rounded-md mt-12 bg-gray-200 flex justify-center items-center font-medium hover:bg-gray-300"
                    onClick={() => addNewSection()}
                >
                    {isLoading && <Spinner />}
                    add
                </div>
            </div>
        </div>
    )
}

interface CustomizeViewProps {
    setUrlParams: SetURLSearchParams;
    setStyles: React.Dispatch<SetStateAction<MelistStyles>>;
}
function CustomizeView({ setUrlParams, setStyles } : CustomizeViewProps) {
    const updateColor = (selectedColor : string) => {
        console.log("updating color")
        setStyles({bgColor: selectedColor})
    }
    return (
        <div>
            <div className="font-semibold">Choose background</div>
            <div className="flex gap-2 mt-2">
                <div className="size-10 rounded-full bg-blue-200 hover:bg-blue-300" onClick={() => updateColor("bg-sky-200")} />
                <div className="size-10 rounded-full bg-yellow-200 hover:bg-yellow-300" onClick={() => updateColor("bg-yellow-200")} />
                <div className="size-10 rounded-full bg-green-200 hover:bg-green-300" onClick={() => updateColor("bg-green-200")} />
                <div className="size-10 rounded-full bg-purple-200 hover:bg-purple-300" onClick={() => updateColor("bg-purple-200")} />
            </div>
            <div className="flex gap-2">
                <div 
                    className="py-2 w-32 rounded-md mt-12 bg-gray-200 flex justify-center items-center font-medium hover:bg-gray-300"
                    onClick={() => setUrlParams(prev => {
                        prev.set("view", "")
                        return prev
                    })}
                >
                    <ArrowLeftIcon className="size-4 stroke-2 mr-1" /> back
                </div>
                <div 
                    className="py-2 px-6 rounded-md mt-12 bg-gray-200 flex justify-center items-center font-medium hover:bg-gray-300"
                    onClick={() => {}}
                >
                    save changes
                </div>
            </div>
        </div>
    )
}

// opens when user clicks on product on list
interface SelectedViewProps {
    isNew: boolean;
    setUrlParams: SetURLSearchParams;
    product: ProductData | null;
}
function SelectedView({ setUrlParams, product, isNew } : SelectedViewProps) {
    const [productImageUrl, setProductImageUrl] = useState<string | null>(null)
    const getUrl = () => {
        if (!product) return 
        const url = fetchProductImageUrl(product.id)
        setProductImageUrl(url)
    }
    useEffect(() => {
        getUrl()
    },[product])
    return (<>
        {!product && <div>no product found. click on another one</div>}
        {product && (<div>
            {isNew && <div className="font-semibold text-sm mb-8">added to your list!</div>}
            <div className="flex gap-2">
                {product.tags && product.tags.length > 0 && product.tags.map(item => (
                    <div key={item.tag_id} className="px-4 py-1 bg-white rounded-full text-sm">{item.tag_name}</div>
                ))}
            </div>
            <div className="mt-4">
                <div className="text-2xl font-bold">{product.product_name}</div>
                {productImageUrl != null && <img className="mt-4 w-40 h-40 object-cover rounded-lg" src={productImageUrl} />}
                <div className="mt-4">{product?.reaction}</div>
            </div>
            <div className="flex gap-2 mt-12">
                <div 
                    className="py-2 w-32 rounded-md mt-12 bg-gray-200 flex justify-center items-center font-medium hover:bg-gray-300"
                    onClick={() => {
                        const params = new URLSearchParams()
                        params.set("view", "")
                        setUrlParams(params)
                    }}
                >
                    <ArrowLeftIcon className="size-4 stroke-2 mr-1" /> back
                </div>
                <div 
                    className="py-2 w-32 rounded-md mt-12 bg-gray-200 flex justify-center items-center font-medium hover:bg-gray-300"
                    onClick={() => {
                        const params = new URLSearchParams()
                        params.set("view", "editSelected")
                        params.set("productId", product ? product.id : "")
                        setUrlParams(params)
                    }}
                >
                    <PencilSquareIcon className="size-5 stroke-2 mr-1" /> edit
                </div>
            </div>
        </div>)}
        
    </>)
}

interface EditSelectedViewProps {
    setUrlParams: SetURLSearchParams;
    populateList: () => Promise<void>;
    product: ProductData | null;
}
function EditSelectedView({ setUrlParams, populateList, product } : EditSelectedViewProps) {
    const [tagOptions, setTagOptions] = useState<TagSelectable[]>([])
    const [initialTags, setInitialTags] = useState<TagSelectable[]>([])
    const [reaction, setReaction] = useState<string>("")
    const [productLink, setProductLink] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const populateTagOptions = async () => {
        if (!product) return 

        const userTags = await fetchUserTags()
        const productTags = await fetchProductTags(product.id)

        if (!userTags || !productTags) return 

        // reformat
        const userTagsSelectable: TagSelectable[] = 
            userTags.map(userTag => ({ 
                id: userTag.tag_id, tag_name: userTag.tag_name, selected: false }))

        // mark product tags selected
        productTags.forEach(productTag => {
            const matchingIdx = userTagsSelectable
                .findIndex(userTag => userTag.id == productTag.tag_id)
            userTagsSelectable[matchingIdx].selected = true
        })

        setTagOptions(userTagsSelectable)
        setInitialTags(clone(userTagsSelectable))
    }
    const submitUpdate = async () => {
        if (!product) return 

        setIsLoading(true)

        // update product
        const response = updateExistingProduct({ reaction, 
            product_link: productLink } , product.id)

        if (!response) return 

        // update tags
        const tagsToDelete : TagSelectable[] = [] 
        const tagsToAdd : TagSelectable[] = []

        tagOptions.forEach((item,i) => {
            if (item.selected && !initialTags[i].selected) 
                tagsToAdd.push(item)
            if (!item.selected && initialTags[i].selected) 
                tagsToDelete.push(item)
        })

        const user = await fetchSessionuser()
        if (!user) return
        
        const uploaded = uploadProductTags(tagsToAdd.map(item => 
            ({ tag_id: item.id, m_product_id: product.id, user_id: user.userId })))
        if (!uploaded) return 

        const { data, error } = await supabase
            .from("m_product_tag")
            .delete()
            .eq("m_product_id", product.id)
            .eq("user_id", user.userId)
            .in("tag_id", tagsToDelete.map(toDel => toDel.id))
            .select()
        if (error) console.log("error removing tags", error)

        // refetch list data
        await populateList()

        setIsLoading(false)

        setUrlParams(prev => {
            prev.set("view", "selected")
            return prev
        })
    }
    useEffect(() => {
        populateTagOptions()

        if (product?.reaction) setReaction(product.reaction)
        if (product?.product_link) setProductLink(product.product_link)
    },[])
    return (
        <div>
            <div className="font-semibold text-sm">make any edits here...</div>
            <div className="mt-4">
                <div className="font-semibold text-3xl">{product?.product_name}</div>
                <div className="mt-8 flex flex-col gap-12">
                    <div>
                        <div>modifiers</div>
                        <div className="flex gap-2 font-medium mt-2">
                            {tagOptions.map((item,i) => (
                                <div 
                                    key={item.id}
                                    className={`px-4 py-1 bg-white rounded-full text-sm ${item.selected && "bg-yellow-100"} hover:pointer-cursor`}
                                    onClick={() => {
                                        const isSelected = item.selected
                                        setTagOptions(prev => {
                                            const updated = [...prev]
                                            updated[i].selected = !isSelected
                                            return updated
                                        })
                                    }}
                                >
                                    {item.tag_name}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div>your reaction</div>
                        <textarea 
                            className="bg-white p-2 text-sm rounded-md w-4/5 mt-2" 
                            value={reaction}
                            onChange={(e) => setReaction(e.target.value)}
                        />
                    </div>
                    <div>
                        <div>product link</div>
                        <input 
                            value={productLink}
                            onChange={(e) => setProductLink(e.target.value)} 
                            className="p-2 mt-2 bg-white w-4/5 rounded-md text-sm" 
                            placeholder="type here..." 
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-between">
                <div className="flex gap-2">
                    <div 
                        className="py-2 w-32 rounded-md mt-12 bg-gray-200 flex justify-center items-center font-medium hover:bg-gray-300"
                        onClick={() => setUrlParams(prev => {
                            prev.set("view", "selected")
                            return prev
                        })}
                    >
                        <ArrowLeftIcon className="size-4 stroke-2 mr-1" /> back
                    </div>
                    <div 
                        className="py-2 px-6 rounded-md mt-12 bg-gray-200 flex justify-center items-center font-medium hover:bg-gray-300"
                        onClick={() => submitUpdate()}
                    >
                        {isLoading && <Spinner />}
                        save
                    </div>
                </div>
                <div 
                    className="py-2 px-6 rounded-md mt-12 bg-gray-200 flex justify-center items-center font-medium hover:bg-gray-300"
                    onClick={() => {}}
                >
                    delete
                </div>
            </div>
        </div>
    )
}

function HelpView({ setUrlParams } : { setUrlParams: SetURLSearchParams }) {
    return (
        <div>
            <div className="font-semibold">Editing / removing a product</div>
            <div className="mt-2 text-sm">
                <div>To edit or remove a product, simply click on it from the list on the left.</div>
            </div>
            <div className="flex gap-2 mt-16">
                <div 
                    className="py-2 w-32 rounded-md mt-12 bg-gray-200 flex justify-center items-center font-medium hover:bg-gray-300"
                    onClick={() => setUrlParams(prev => {
                        prev.set("view", "")
                        return prev
                    })}
                >
                    <ArrowLeftIcon className="size-4 stroke-3 mr-1" /> back
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
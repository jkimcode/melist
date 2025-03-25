import { ArrowLeftIcon, ArrowRightIcon, ClockIcon, PencilSquareIcon } from "@heroicons/react/24/outline"
import Melist from "../../components/Melist"
import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PlusCircleIcon } from "@heroicons/react/16/solid"
import Toggle from "../../components/Toggle"
import { useSearchParams } from "react-router"
import { SetURLSearchParams } from "react-router"
import { MelistStyles, ProductData, TagData } from "../../common/types"
import useFetchMelist from "../../hooks/useFetchMelist"
import { supabase } from "../../supabase/client"

function Edit() {
    const [urlParams, setUrlParams] = useSearchParams()
    const [styles, setStyles] = useState<MelistStyles>({bgColor: "gray-100"})
    const { listData } = useFetchMelist()

    const productNameRef = useRef<HTMLInputElement>(null)
    const [tags, setTags] = useState<TagData[]>([])
    const reactionRef = useRef<HTMLTextAreaElement>(null)
    const productLinkRef = useRef<HTMLInputElement>(null)
    const findProduct = (productId: string | null) => {
        if (!productId) return null 
        if (!listData) return null

        // need to search through all sections
        let res : ProductData | null = null
        listData.forEach(section => {
            section.products.forEach(product => {
                if (product.id == productId) {
                    res = product
                    return 
                }
            })
        })
        return res
    }
    return (
        <div className="mx-auto max-w-5xl p-4">
            <div className="flex justify-center">
                <div className="flex flex-col">
                    <div className="font-extrabold text-3xl mt-16 justify-self-start">Edit</div>
                    <div className="mt-4 flex gap-8">
                        <Melist melistData={listData ? listData : undefined} displayMode="edit" styles={styles} />
                        <div className={`bg-gray-100 h-fit p-8 rounded-md items-center w-xl text-lg transition-[width] duration-100`}>
                            {(urlParams.get("view") == undefined || urlParams.get("view") == "") && (
                                <>
                                    <div className="font-medium text-sm">What would you like to do?</div>
                                    <div className="flex flex-col gap-2 mt-6">
                                        <div 
                                            className="p-6 bg-gray-200 font-semibold text-sm flex justify-between hover:bg-gray-300"
                                            onClick={() => {setUrlParams((prev) => { 
                                                prev.set("view", "step1") 
                                                return prev
                                            } )}}
                                        >
                                            <div>Add a product</div>
                                            <ArrowRightIcon className="size-5" />
                                        </div>
                                        <div 
                                            className="p-6 bg-gray-200 font-semibold text-sm flex justify-between hover:bg-gray-300"
                                            onClick={() => setUrlParams(prev => {
                                                prev.set("view", "customize")
                                                return prev
                                            })}
                                        >
                                            Customize colors / background
                                            <ArrowRightIcon className="size-5" />
                                        </div>
                                        <div 
                                            className="p-6 bg-gray-200 font-semibold text-sm flex justify-between hover:bg-gray-300"
                                            onClick={() => {
                                                const params = new URLSearchParams()
                                                params.set("view", "help")
                                                setUrlParams(params)
                                            }}
                                        >
                                            Edit / remove a product
                                            <ArrowRightIcon className="size-5" />
                                        </div>
                                    </div>  
                                </>
                            )}

                            {/* need separate AnimationPresence for each view */}
                            {urlParams.get("view") == "step1" && (
                                <AnimatePresence>
                                    <motion.div 
                                        transition={{ type: "spring", duration: 0.1, bounce: 0 }}
                                        initial={{ x: -10 }}
                                        animate={{ x: 0 }}
                                        exit={{ x: -10 }}
                                    >
                                        <Step1View productName={productNameRef} setUrlParams={setUrlParams} />
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
                                        <Step3View reaction={reactionRef} setUrlParams={setUrlParams} />
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
                                        <Step4View setUrlParams={setUrlParams} />
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
                                        <Step5View productLink={productLinkRef} setUrlParams={setUrlParams} />
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
                                        <AddSectionView setUrlParams={setUrlParams} />
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
                                        <SelectedView setUrlParams={setUrlParams} isNew={urlParams.get("context") == "created"} product={findProduct(urlParams.get("productId"))} />
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
                                        <EditSelectedView setUrlParams={setUrlParams} />
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

interface Step1ViewProps {
    productName: RefObject<HTMLInputElement | null>
    setUrlParams: SetURLSearchParams;
}
function Step1View({ productName, setUrlParams } : Step1ViewProps ) {
    return (
        <div>
            <div className="font-semibold text-sm">great! first let's gather some info...</div>
            <div className="mt-8">
                <div className="font-semibold text-2xl">What is your product called?</div>
                <input ref={productName} className="p-4 mt-4 bg-white w-full rounded-md" placeholder="type here..." />
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
    setTags: Dispatch<SetStateAction<TagData[]>>;
    setUrlParams: SetURLSearchParams;
}
function Step2View({ setTags, setUrlParams } : Step2ViewProps ) {
    const [tagOptions, setTagOptions] = useState<TagData[]>([])
    const newTagRef = useRef<HTMLInputElement>(null)
    const addNewTag = async (tagName : string) => {
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) return

        const { data, error } = await supabase.from('tags').insert([{ tag_name: tagName , user_id: user.id }]).select()

        if (error) {
            console.log('error uploading new tag', error)
            return 
        }

        setTagOptions(prev => ([...prev, {...data[0]}]))

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
            const reformatted : TagData[] = tags.map(item => ({ id: item.id, tag_name: item.tag_name, selected: false }))
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
                        setTags(tagOptions)
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
    reaction: RefObject<HTMLTextAreaElement | null>;
    setUrlParams: SetURLSearchParams;
}
function Step3View({ reaction, setUrlParams } : Step3ViewProps ) {
    return (
        <div>
            <div className="">
                <div className="font-semibold text-sm">getting there...</div>
                <div className="mt-8">
                    <div className="font-semibold text-2xl">Share your reaction to the product (this is optional)</div>
                    <textarea ref={reaction} className="p-4 mt-4 bg-white w-full rounded-md text-sm min-h-24" placeholder="type here..." />
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
}
function Step4View({ setUrlParams } : Step4ViewProps ) {
    return (
        <div>
            <div className="">
                <div className="">
                    <div className="font-semibold text-2xl">Upload your own photo of the product</div>
                    <div className="mt-4 text-sm">this helps us make your list beautiful</div>
                    <input className="mt-4" type="file" />
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
                    I don't have a photo
                </div>
            </div>
        </div>
    )
}

interface Step5ViewProps {
    productLink: RefObject<HTMLInputElement | null>;
    setUrlParams: SetURLSearchParams;
}
function Step5View({ productLink, setUrlParams } : Step5ViewProps ) {
    return (
        <div>
            <div className="">
                <div className="font-semibold text-sm">final step!</div>
                <div className="mt-8">
                    <div className="font-semibold text-xl">Add a link for others to view this product</div>
                    <input ref={productLink} className="py-2 px-4 mt-4 bg-white w-full rounded-md text-sm" placeholder="type here..." />
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
                    onClick={() => setUrlParams(prev => {
                        prev.set("view", "selected")
                        prev.set("context", "created")
                        return prev
                    })}
                >
                    skip
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
}
function AddSectionView({ setUrlParams } : AddSectionViewProps) {
    return (
        <div>
            <div className="font-semibold">Add a new section</div>
            <div className="mt-2">
                <input className="py-3 px-4 rounded-md w-72 bg-gray-200 text-sm" placeholder="e.g. summer, holidays, bags" />
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
                    onClick={() => {}}
                >
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
    return (
        <div>
            {isNew && <div className="font-semibold text-sm mb-8">added to your list!</div>}
            <div className="flex gap-2">
                <div className="px-4 py-1 bg-white rounded-full text-sm">fave</div>
            </div>
            <div className="mt-4">
                <div className="text-2xl font-bold">{product?.product_name}</div>
                <div className="h-30 w-50 bg-white rounded-md mt-4"></div>
                <div className="mt-4">{product?.reaction}</div>
            </div>
            <div className="flex gap-2 mt-12">
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
                    className="py-2 w-32 rounded-md mt-12 bg-gray-200 flex justify-center items-center font-medium hover:bg-gray-300"
                    onClick={() => setUrlParams(prev => {
                        prev.set("view", "editSelected")
                        return prev
                    })}
                >
                    <PencilSquareIcon className="size-5 stroke-2 mr-1" /> edit
                </div>
            </div>
        </div>
    )
}

interface EditSelectedViewProps {
    setUrlParams: SetURLSearchParams;
}
function EditSelectedView({ setUrlParams } : EditSelectedViewProps) {
    return (
        <div>
            <div className="font-semibold text-sm">make any edits here...</div>
            <div className="mt-4">
                <div className="font-semibold text-3xl">Neon Pajamas</div>
                <div className="mt-8 flex flex-col gap-12">
                    <div>
                        <div>modifiers</div>
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
                        onClick={() => {}}
                    >
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
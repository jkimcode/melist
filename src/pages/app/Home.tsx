import { useEffect, useState } from "react"
import HomePicturePost from "../../components/HomePicturePost"
import HomePost from "../../components/HomePost"
import { supabase } from "../../supabase/client"
import { CondensedProfile, HomeTag, ProductData } from "../../common/types"
import Melist from "../../components/melist/Melist"
import { fetchProductById } from "../../supabase/api/m_product"

function Home() {
    const [discoverProfiles, setDiscoverProfiles] = useState<CondensedProfile[]>([])
    const [discoverProducts, setDiscoverProducts] = useState<ProductData[]>([])

    const getDiscoverProfiles = async () => {
        const { data, error } = await supabase.from("top_followers").select("*")
        if (error) {
            console.log("error fetch ranked profiles", error)
            return 
        }
        if (!data) return 

        const idsToSearch = data.map(item => item.src_user_id)
        const { data: profiles, error: e1 } = await supabase.from("user")
            .select("id,username,display_name,m_product ( id, product_name )")
            .in("id", idsToSearch)
        if (e1) {
            console.log("error fetch profile info", e1)
            return 
        }

        const formattedProfiles: CondensedProfile[] = profiles.map(profile => ({
            userId: profile.id,
            username: profile.username,
            displayName: profile.display_name,
            products: profile.m_product
        }))

        // fetch tags
        for (let i = 0; i < formattedProfiles.length; i++) {
            const products = formattedProfiles[i].products
            for (let j = 0; j < products.length; j++) {
                const product = products[j]
                const { data: tags, error: e2 } = await supabase.from("m_product_tag")
                    .select("m_product_id,tag_id,tags ( tag_name )").eq("m_product_id", product.id)
                if (e2) {
                    console.log(e2)
                    continue
                }
                if (!tags) continue
                const formattedTags: HomeTag[] = tags.map(tag => ({
                    tag_id: tag.tag_id,
                    tag_name: tag.tags.tag_name,
                    product_id: tag.m_product_id
                }))
                product.tags = formattedTags
            }
        }

        setDiscoverProfiles(formattedProfiles)
    }

    const getDiscoverProducts = async () => {
        const { data, error } = await supabase.from("top_products").select("*")
        if (error) {
            console.log("error fetch top products", error)
            return 
        }

        const discoverProducts: ProductData[] = []
        for (let i = 0; i < data.length; i++) {
            const product = await fetchProductById(data[i].m_product_id)
            if (!product) continue
            discoverProducts.push({
                id: product.id,
                include_link_if_present: product.include_link_if_present,
                rank_within_section: null,
                reaction: null,
                section_id: product.section_id,
                user_id: product.user_id,
                product_name: product.product_name
            })
        }
        
        setDiscoverProducts(discoverProducts)
    }

    useEffect(() => {
        getDiscoverProfiles()
        getDiscoverProducts()
    },[])
    return (
        <div className="mx-auto max-w-5xl p-4">
            <div className="font-medium text-3xl mt-16">Discover</div>
            <div className="flex gap-6 mt-6">
                <div className="flex flex-col gap-6">
                    {/* <HomePost postType="followUpdate" />
                    <HomePost postType="recommendedProducts" /> */}
                    {discoverProfiles.map(profile => (
                        <Melist displayMode="home" condensedProfile={profile}  />
                    ))}
                </div>
                <div className="flex flex-col gap-4">
                    {discoverProducts.map(product => (
                        <HomePicturePost productDetails={product} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home
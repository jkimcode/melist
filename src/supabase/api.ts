import { MelistData, ProductData, TagData } from "../common/types";
import { supabase } from "./client";

// all sections, associated products and tags
export async function fetchMelistData(userId: string): Promise<MelistData | null> {

    let { data: sections , error: e1 } = await supabase
        .from('m_section')
        .select("id,section_name,user_id")
        .eq('user_id', userId)

    if (e1) {
        console.log('error', e1)
        return null
    }

    let { data: products, error: e2 } = await supabase
        .from('m_product')
        .select("id,section_id,user_id,reaction,rank_within_section,include_link_if_present,product_name,product_link")
        .eq('user_id', userId)

    if (e2 || !products) {
        console.log('error', e2)
        return null
    }

    // get tags
    const formattedProducts : ProductData[] = products
    for (let i = 0; i < formattedProducts.length; i++) {
        const product = formattedProducts[i]
        let { data: tags, error: e3 } = await supabase
            .from('m_product_tag')
            .select("m_product_id,tag_id,tags ( tag_name )")
            .eq("m_product_id", product.id)
        
        if (e3) {
            console.log('error fetch tags', e3)
            return null
        }
        
        if (!tags) {
            console.log("tags is null")
            return null
        }
        
        const formattedTags : TagData[] = tags.map(tag => ({
            tag_id: tag.tag_id,
            tag_name: tag.tags?.tag_name,
            product_id: tag.m_product_id
        }))
        formattedProducts[i].tags = formattedTags
    }

    const res = sections!.map(s => ({
        section_name: s.section_name,
        section_id: s.id,
        products: products!.filter(p => p.section_id == s.id)
    }))

    return res
}

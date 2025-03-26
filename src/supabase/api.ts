import { ProductData, TagData } from "../common/types";
import { supabase } from "./client";

export async function fetchMelistData(userId: string) {

    let { data: sections , error: e1 } = await supabase
        .from('m_section')
        .select("id,section_name,user_id")
        .eq('user_id', userId)

    if (e1) {
        console.log('error', e1)
        return 
    }
        

    let { data: products, error: e2 } = await supabase
        .from('m_product')
        .select("id,section_id,user_id,reaction,rank_within_section,include_link_if_present,product_name")
        .eq('user_id', userId)

    if (e2 || !products) {
        console.log('error', e2)
        return
    }

    // get tags
    const formattedProducts : ProductData[] = products
    for (let i = 0; i < products.length; i++) {
        const product = formattedProducts[i]
        let { data: tags, error: e3 } = await supabase
            .from('m_product_tag')
            .select("m_product_id,tag_id,tags ( tag_name )")
            .eq("m_product_id", product.id)
        if (!tags) return 
        const formattedTags : TagData[] = tags.map(tag => ({
            tag_id: tag.tag_id,
            tag_name: tag.tags.tag_name,
            product_id: tag.m_product_id
        }))
        product.tags = formattedTags
    }

    const res = sections!.map(s => ({
        section_name: s.section_name,
        section_id: s.id,
        products: products!.filter(p => p.section_id == s.id)
    }))

    return res
}
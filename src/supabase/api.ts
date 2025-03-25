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

    if (e2) {
        console.log('error', e2)
    }

    const res = sections!.map(s => ({
        section_name: s.section_name,
        products: products!.filter(p => p.section_id == s.id)
    }))
    
    return res
}
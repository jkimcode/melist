import { PostProductTag, UserData } from "../../common/types";
import { supabase } from "../client";

export async function uploadProductTags(postProductTags: PostProductTag[]) {
    const { data, error } = await supabase.from("m_product_tag").insert(postProductTags).select()

    if (error) {
        console.log("error insert product tag(s)", error)
        return null
    }

    if (!data || data.length == 0) return

    return data[0]
}

export async function fetchProductTags(productId: string) {
    let { data, error } = await supabase
        .from("m_product_tag")
        .select("tag_id, tags ( tag_name )")
        .eq("m_product_id", productId)

    if (error) {
        console.log("error fetch product tag(s)", error)
        return null
    }

    return data
}

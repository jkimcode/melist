import { PostProduct, PostProductTag, UpdateProduct } from "../../common/types";
import { supabase } from "../client";

export async function uploadProduct(postProduct: PostProduct) {
    const { data, error } = await supabase.from('m_product').insert([postProduct]).select()

    if (error || data.length == 0) {
        console.log('error insert product', error)
        return null
    }

    return data[0]
}

export async function updateExistingProduct(updateProduct: UpdateProduct, productId: string) {
    const { data, error } = await supabase
        .from("m_product")
        .update(updateProduct)
        .eq("id", productId)
        .select()

    if (error) {
        console.log("error update product", error)
        return null
    }
    
    return data
}

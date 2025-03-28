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

export async function fetchProductById(productId: string) {
    const { data, error } = await supabase
        .from("m_product")
        .select("*")
        .eq("id", productId)

    if (error) {
        console.log("error fetch product by id", error)
        return null
    }

    if (!data || data.length == 0) {
        return null
    }

    return data[0]
}
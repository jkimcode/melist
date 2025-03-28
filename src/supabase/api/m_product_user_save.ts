import { PostProductUserSave } from "../../common/types";
import { supabase } from "../client";

export async function uploadProductUserSave(postProductUserSave: PostProductUserSave) {
    const { data, error } = await supabase.from("m_product_user_save")
        .insert([postProductUserSave]).select()

    if (error) {
        console.log("error insert product user save", error)
        return null
    }

    return data
}

export async function fetchProductUserSaves(userId: string, srcUserId?: string) {
    let query = supabase.from("m_product_user_save").select("user_id, m_product_id, src_user_id").eq("user_id", userId)

    // specify whose product is read
    if (srcUserId) {
        query = query.eq("src_user_id", srcUserId)
    }

    const { data, error } = await query

    if (error) {
        console.log("error select product user save", error)
        return null
    }

    console.log(data)

    return data
}
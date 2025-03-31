import { supabase } from "../client";

export async function uploadProductImage(file: File, filePath: string) {
    const { data, error } = await supabase.storage.from("productpicture").upload(filePath, file)
    if (error) {
        console.log("error upload file", error)
        return null
    } else {
        return data
    }
}

export async function fetchProductImageUrl(prductId: string) {
    const { data } = await supabase.storage.from("productpicture").getPublicUrl(prductId)

    return data.publicUrl
}
import { supabase } from "../client";

export async function uploadProductImage(file: File, filePath: string) {
    const { data, error } = await supabase.storage.from("productpicture").upload(filePath, file)
    if (error) {
        console.log("error upload file", error)
        return null
    } 
    return data
}

export function fetchProductImageUrl(prductId: string) {
    const { data } = supabase.storage.from("productpicture").getPublicUrl(prductId)

    return data.publicUrl
}

export async function replaceOrUploadProfileImage(file: File, filePath: string) {
    const { data, error } = await supabase.storage.from("profilepicture").upload(filePath, file, {
        upsert: true,
    })
    if (error) {
        console.log("error upsert profile picture", error)
        return null
    } 
    return data
}

export function fetchProfileImageUrl(userId: string) {
    const { data } = supabase.storage.from("profilepicture").getPublicUrl(userId)

    return data.publicUrl
}
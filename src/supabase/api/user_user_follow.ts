import { supabase } from "../client";

export async function uploadUserFollow(userId: string, srcUserId: string) {
    const { data, error } = await supabase.from("user_user_follow")
        .insert([{ user_id: userId, src_user_id: srcUserId }]).select()

    if (error) {
        console.log("error upload user follow", error)
        return null
    }

    if (!data || data.length == 0) {
        console.log("user follow: not inserted")
        return null
    }

    return data[0]
}

export async function deleteUserFollow(userId: string, srcUserId: string) {
    const { data, error } = await supabase.from("user_user_follow")
        .delete().eq("user_id", userId).eq("src_user_id", srcUserId).select()

    if (error) {
        console.log("error delete user follow", error)
        return null
    }

    return data
}

export async function fetchUserFollow(userId: string) {
    const { data, error } = await supabase.from("user_user_follow")
        .select("*").eq("user_id", userId)

    if (error) {
        console.log("error fetch user follow", error)
        return null
    }

    if (!data) {
        console.log("fetch user follow empty")
        return null
    }

    return data
}
import { ResponseTag, UserData } from "../../common/types"
import { supabase } from "../client"
import { fetchSessionuser } from "./user"

export async function uploadTag(tagName: string): Promise<ResponseTag | null> {
    const response = await fetchSessionuser()
    if (!response) return null 

    const { data, error } = await supabase.from('tags').insert([
        { tag_name: tagName , user_id: response.userId }]).select("tag_name,id,user_id")

    if (error) {
        console.log('error uploading new tag', error)
        return null
    }

    if (!data || data.length == 0) return null 

    // format
    const formatted: ResponseTag = {
        tag_id: data[0].id,
        tag_name: data[0].tag_name,
        user_id: data[0].user_id
    }

    return formatted
}

export async function fetchUserTags(userId?: string): Promise<ResponseTag[]>  {
    if (!userId) {
        const response = await fetchSessionuser()
        if (response) userId = response.userId
        else return []
    }

    let { data, error } = await supabase
        .from("tags").select("id,user_id,tag_name").eq("user_id", userId)

    if (error) {
        console.log("error fetch user tags", error)
        return []
    }

    if (!data) return []

    return data.map(tag => ({ tag_id: tag.id, user_id: userId, tag_name: tag.tag_name }))
}
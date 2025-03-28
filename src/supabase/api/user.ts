import { UserData } from "../../common/types"
import { supabase } from "../client"

export async function fetchSessionuser(): Promise<UserData | null> {
    const ls = localStorage.getItem("user")

    if (ls) {
        const parsed: UserData = JSON.parse(ls)
        return parsed
    }

    // session user
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    // user details
    const { data } = await supabase.from("user").select("*").eq("id", user.id)
    if (!data || data.length == 0) return null

    const profile = data[0]

    const formattedUser : UserData = {
        userId: profile.id,
        username: profile.username,
        displayName: profile.display_name
    }

    localStorage.setItem("user", JSON.stringify(formattedUser))

    return formattedUser
}

export async function fetchUser(userId: string) {
    const { data } = await supabase.from("user").select("*").eq("id", userId)
    if (!data || data.length == 0) return null

    const profile = data[0]

    const formattedUser : UserData = {
        userId: profile.id,
        username: profile.username,
        displayName: profile.display_name
    }

    return formattedUser
}
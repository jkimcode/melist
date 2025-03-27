import { useEffect, useState } from "react";
import { UserData } from "../common/types";
import { supabase } from "../supabase/client";

export default function useFetchUser() {
    const [user, setUser] = useState<UserData>({userId: "", username: "", displayName: ""})

    const fetchUser = async () => {
        const ls = localStorage.getItem("user")
    
        if (ls) {
            const parsed : UserData = JSON.parse(ls)
            setUser(parsed)
        }
    
        // session user
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return  

        // user details
        const { data } = await supabase.from("user").select("*").eq("id", user.id)
        if (!data || data.length == 0) return 
    
        const profile = data[0]
    
        const formattedUser : UserData = {
            userId: profile.id,
            username: profile.username,
            displayName: profile.display_name
        }
    
        localStorage.setItem("user", JSON.stringify(formattedUser))
    
        setUser(formattedUser)
    }

    useEffect(() => {
        fetchUser()
    },[])

    return { userData: user }
}


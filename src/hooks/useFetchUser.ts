import { useEffect, useState } from "react";
import { UserData } from "../common/types";
import { fetchSessionuser, fetchUser } from "../supabase/api/user";

export default function useFetchUser(userId?: string, useDefault?: boolean) {
    const [user, setUser] = useState<UserData | null>(null)

    const tryFetch = async () => {
        let success = null
        if (userId) success = await fetchUser(userId)
        else if (useDefault) success = await fetchSessionuser()

        if (success) setUser(success)
    }
    useEffect(() => {
        tryFetch()
    },[userId])

    return { userData: user, refetchUser: tryFetch }
}


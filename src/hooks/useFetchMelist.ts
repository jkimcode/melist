import { useEffect, useState } from "react";
import { MelistData } from "../common/types";
import { fetchMelistData } from "../supabase/api";
import { supabase } from "../supabase/client";

export default function useFetchMelist(userId?: string) {
    const [listData, setListData] = useState<MelistData>([])
    const [isFetching, setIsFetching] = useState<boolean>(false)

    const populateList = async () => {
        setIsFetching(true)

        // if userId not provided, fetch list of session user
        if (!userId) {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return
            userId = user.id
        }
        
        const data = await fetchMelistData(userId)
        if (data) {
            console.log("melist", data)
            setListData(data)
        }

        setIsFetching(false)
    }

    useEffect(() => {
        populateList()
    },[])

    return { listData, populateList, isFetching }
}


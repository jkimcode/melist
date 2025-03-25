import { useEffect, useState } from "react";
import { MelistData } from "../common/types";
import { fetchMelistData } from "../supabase/api";
import { supabase } from "../supabase/client";

export default function useFetchMelist() {
    const [listData, setListData] = useState<MelistData | null>(null)

    useEffect(() => {
        const populateList = async () => {
            const { data: { user } } = await supabase.auth.getUser()

            if (!user) return

            const data = await fetchMelistData(user.id)
            if (data) {
                console.log("melist", data)
                setListData(data)
            }
        }
        populateList()
    },[])

    return { listData }
}


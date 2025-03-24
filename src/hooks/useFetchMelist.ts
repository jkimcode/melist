import { useEffect, useState } from "react";
import { MelistData } from "../common/types";
import { fetchMelistData } from "../supabase/api";

export default function useFetchMelist() {
    const [listData, setListData] = useState<MelistData | null>(null)

    useEffect(() => {
        const populateList = async () => {
            const data = await fetchMelistData("04eda49d-6cd3-49fc-8ea4-0a093f72b69c")
            if (data) {
                console.log(data)
                setListData(data)
            }
        }
        populateList()
    },[])

    return { listData }
}


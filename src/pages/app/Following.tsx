import { useEffect, useState } from "react"
import Melist from "../../components/melist/Melist"
import useFetchUser from "../../hooks/useFetchUser"
import { fetchUserFollow } from "../../supabase/api/user_user_follow"
import { supabase } from "../../supabase/client"
import { CondensedProfile } from "../../common/types"

function Following() {
    const { userData } = useFetchUser()
    const [profiles, setProfiles] = useState<CondensedProfile[]>([]) 
    const getFollowing = async () => {
        if (!userData) return 

        const success = await fetchUserFollow(userData.userId)
        if (!success) return 

        // userIds of followed profiles
        const srcUserIds = success.map(item => item.src_user_id)

        const { data, error } = await supabase.from("user")
            .select("id,username,display_name,m_product ( id, product_name )")
            .in("id", srcUserIds)

        if (error) {
            console.log("error fetch followed")
            return 
        }

        // format
        const formatted: CondensedProfile[] = data.map(item => ({
            userId: item.id,
            displayName: item.display_name,
            username: item.username,
            products: item.m_product
        }))

        setProfiles(formatted)
    }
    useEffect(() => {
        getFollowing()
    },[userData?.userId])

    return (
        <div className="mx-auto max-w-5xl p-4">
            <div className="flex justify-center">
                <div className="flex flex-col">
                    <div className="font-medium text-3xl mt-16 justify-self-start">Following</div>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                        {profiles.map(item => (
                            <Melist key={item.userId} displayMode="minimized" condensedProfile={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Following
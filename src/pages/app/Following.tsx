import { useEffect, useState } from "react"
import Melist from "../../components/Melist"
import useFetchUser from "../../hooks/useFetchUser"
import { fetchUserFollow } from "../../supabase/api/user_user_follow"
import { supabase } from "../../supabase/client"
import { FollowedProfile } from "../../common/types"

function Following() {
    const { userData } = useFetchUser()
    const [profiles, setProfiles] = useState<FollowedProfile[]>([]) 
    const getFollowing = async () => {
        if (!userData) return 

        const success = await fetchUserFollow(userData.userId)
        if (!success) return 

        // userIds of followed profiles
        const srcUserIds = success.map(item => item.src_user_id)

        const { data, error } = await supabase.from("user")
            .select("id,username,display_name,m_product ( product_name )")
            .in("id", srcUserIds)

        if (error) {
            console.log("error fetch followed")
            return 
        }

        // format
        const formatted: FollowedProfile[] = data.map(item => ({
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
                    <div className="mt-4 flex gap-4">
                        {profiles.map(item => (
                            <Melist displayMode="minimized" />
                        ))}

                        {/* should organize fetch data s.t. list follower decreases left->right, top->down */}
                        <div className="flex flex-col gap-4">
                            <Melist displayMode="minimized" />
                            <Melist displayMode="minimized" />
                            <Melist displayMode="minimized" />
                        </div>
                        <div className="flex flex-col gap-4">
                            <Melist displayMode="minimized" />
                            <Melist displayMode="minimized" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Following
import { useEffect, useState } from "react";
import { deleteUserFollow, fetchUserFollow, uploadUserFollow } from "../supabase/api/user_user_follow";

export default function useFollow(userId: string | undefined, srcUserId: string | undefined) {
    const [isFollowingSrcUser, setIsFollowingSrcUser] = useState<boolean>(false)

    const followSrcUser = async () => {
        if (!userId || !srcUserId) return

        const success = await uploadUserFollow(userId, srcUserId)
        if (!success) return 

        setIsFollowingSrcUser(true)
    }

    const unfollowSrcUser = async () => {
        if (!userId || !srcUserId) return 

        const success = await deleteUserFollow(userId, srcUserId)
        if (!success) return 

        setIsFollowingSrcUser(false)
    }

    const getIsFollowingSrcUser = async () => {
        if (!userId || !srcUserId) return

        const success = await fetchUserFollow(userId)
        if (!success) return 

        if (success.findIndex(follow => follow.src_user_id == srcUserId) != -1) {
            setIsFollowingSrcUser(true)
        }
    }

    useEffect(() => {
        getIsFollowingSrcUser()
    },[userId,srcUserId])

    return { followSrcUser, unfollowSrcUser, isFollowingSrcUser }
}
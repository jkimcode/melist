import { useContext, useEffect, useState } from "react"
import Melist from "../../components/Melist"
import { SearchContext } from "../../context/context"
import { supabase } from "../../supabase/client"
import { SearchResultProfile } from "../../common/types"

function Search() {
    const { searchText } = useContext(SearchContext)
    const [ searchResultProfiles, setSearchResultProfiles ] = useState<SearchResultProfile[]>([])

    const search = async (s: string) => {
        // todo: search on username
        let { data: group1, error: e1 } = 
            await supabase.from("user").select("id, username, display_name, m_product ( product_name )")
                    .ilike("display_name", `%${s}%`).range(0,5)

        console.log(group1)
        
        if (e1) {
            console.log('search error', e1)
            return 
        }

        if (!group1) return

        const group1Formatted: SearchResultProfile[] = group1.map(user => ({
            userId: user.id,
            displayName: user.display_name,
            username: user.username,
            products: user.m_product
        }))

        setSearchResultProfiles(group1Formatted)
    }
    useEffect(() => {
        console.log(searchText)

        search(searchText)
        
    },[searchText])
    return (
        <div className="mx-auto max-w-5xl p-4">
            <div className="font-bold text-3xl mt-16">Results</div>
            <div className="grid grid-cols-2 mt-4 gap-6">
                {searchResultProfiles.map(profile => (
                    <Melist key={profile.userId} displayMode="search" searchResultProfile={profile} />
                ))}        
            </div>    
        </div>
    )
}

export default Search
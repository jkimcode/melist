import React, { useState } from "react"
import Navigation from "../components/Navigation"
import { Outlet } from "react-router"
import { SearchContext } from "../context/context"

function AppLayout() {
    const [searchText, setSearchText] = useState<string>("")
    return (
        <SearchContext.Provider value={{searchText, setSearchText}}>
            <Navigation searchText={searchText} setSearchText={setSearchText} />
            <Outlet />
        </SearchContext.Provider>
    )
}

export default AppLayout
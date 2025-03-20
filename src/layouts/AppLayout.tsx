import React from "react"
import Navigation from "../components/Navigation"
import { Outlet } from "react-router"

function AppLayout() {
    return (
        <>
            <Navigation />
            <Outlet />
        </>
    )
}

export default AppLayout
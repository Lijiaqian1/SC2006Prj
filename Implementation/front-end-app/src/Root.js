import React from "react";
import { Outlet } from "react-router-dom";
import NavigationBar from "./components/NavigationBar/NavigationBar.js";

export default function Root() {
    return (
        <>
            <NavigationBar/>
            <main>
                <Outlet />
            </main>
        </>
    )
}
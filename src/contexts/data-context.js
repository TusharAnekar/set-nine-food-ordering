import { createContext, useEffect, useState } from "react";
import { fakeFetch } from "../apis/fakefetch";

export const DataContext = createContext()

export function DataProvider ({children}) {

    const [menu, setMenu] = useState([])
    const [cart, setCart] = useState([])

    async function getMenu () {
        try {
            const {status, data: {menu}} = await fakeFetch( "https://example.com/api/menu")
            if(status === 200) {
                setMenu(menu)
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getMenu()
    }, [])

    return(
        <DataContext.Provider value={{menu, setMenu, cart, setCart}}>
            {children}
        </DataContext.Provider>
    )
}
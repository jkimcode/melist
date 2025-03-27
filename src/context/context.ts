import { createContext } from "react";

export const SearchContext = createContext({
    searchText: "",
    setSearchText: (searchText: string) => {}
})
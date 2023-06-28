import { createContext, useContext, useState } from "react";
import { DataContext } from "./data-context";

export const FilterContext = createContext();

export function FilterProvider({ children }) {
  const { menu } = useContext(DataContext);

  const [filters, setFilters] = useState({
    inputSearch: "",
    typeOfFood: {isVeg: false, isSpicy: false},
    typeOfSort: "",
  });

  const filteredSearchMenu =
    filters.inputSearch.length > 0
      ? menu.filter(({ name }) =>
          name.toLowerCase().includes(filters.inputSearch.toLowerCase())
        )
      : menu;

      let filteredTypeOfFoodMenu = ""

  if(!filters.typeOfFood.isVeg && !filters.typeOfFood.isSpicy) {
    filteredTypeOfFoodMenu = filteredSearchMenu
  } else if (filters.typeOfFood.isVeg && filters.typeOfFood.isSpicy) {
    filteredTypeOfFoodMenu = filteredSearchMenu.filter(({is_vegetarian, is_spicy}) => is_vegetarian && is_spicy)
  } else if (filters.typeOfFood.isVeg) {
    filteredTypeOfFoodMenu = filteredSearchMenu.filter(({is_vegetarian}) => is_vegetarian)
  } else {
    filteredTypeOfFoodMenu = filteredSearchMenu.filter(({is_spicy}) => is_spicy)
  }

  const filteredMenu = filters.typeOfSort === "lth" ? [...filteredTypeOfFoodMenu].sort((a, b) => a.price - b.price) : [...filteredTypeOfFoodMenu].sort((a, b) => b.price - a.price)

  return (
    <FilterContext.Provider value={{ filters, setFilters, filteredMenu }}>
      {children}
    </FilterContext.Provider>
  );
}

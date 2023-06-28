import { useContext } from "react";
import { DataContext } from "../contexts/data-context";
import { FilterContext } from "../contexts/filter-context";

export function Menu() {
  const { menu, cart, setCart } = useContext(DataContext);
  const {filters, setFilters, filteredMenu} = useContext(FilterContext)

  function addToCart(idToBeAdded) {
    if (!cart.includes(menu.find(({ id }) => id === Number(idToBeAdded))))
      setCart([...cart, menu.find(({ id }) => id === Number(idToBeAdded))]);
  }

  function handleInput (e) {
    setFilters({...filters, inputSearch:e.target.value})
  }

  function handleCheckbox (e) {
    if(e.target.value === "veg") {
        setFilters({...filters, typeOfFood: {...filters.typeOfFood, isVeg: e.target.checked}})
    } else {
      setFilters({...filters, typeOfFood: {...filters.typeOfFood, isSpicy: e.target.checked}})
    }
  }

  function handleSort (e) {
    setFilters({...filters, typeOfSort: e.target.value})
  }

  return (
    <>
      <h2>Menu</h2>
      <div>
        <h3>Filters:</h3>
        <input type="text" onChange={handleInput}/>
        <input type="checkbox" id="veg" value="veg" name="typeOfFood" onClick={handleCheckbox} checked={filters.typeOfFood.isVeg}/>
        <label htmlFor="veg">Veg</label>
        <input type="checkbox" id="spicy" value="spicy" name="typeOfFood" onClick={handleCheckbox} checked={filters.typeOfFood.isSpicy}/>
        <label htmlFor="spicy">Spicy</label>
        <input type="radio" id="lth" name="sort" value="lth" onClick={handleSort} checked={filters.typeOfSort === "lth"}/>
        <label htmlFor="lth">Sort(price) Low to High</label>
        <input type="radio" id="htl" name="sort" value={"htl"} onClick={handleSort} checked={filters.typeOfSort === "htl"}/>
        <label htmlFor="htl">Sort(price) High to Low</label>
      </div>

      <div className="container">
        {filteredMenu.map((item) => {
          const { id, name, description, price, image, delivery_time } = item;
          return (
            <div className="item-container">
              <img src={image} alt={name} />
              <div className="details-container">
                <p>Name: {name}</p>
                <p>Description: {description}</p>
                <p>Price: {price}</p>
                <p>Delivery Time: {delivery_time}</p>
                <button onClick={() => addToCart(id)}>
                  {cart.includes(item) ? "Go to Cart" : "Add to cart"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

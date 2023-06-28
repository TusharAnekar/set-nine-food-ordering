import { useContext, useState } from "react";
import { DataContext } from "../contexts/data-context";

export function Cart() {
  const {cart} = useContext(DataContext)
  const [isClicked, setIsClicked] = useState(false)
  const [totalPrice, setTotalPrice] = useState(cart.reduce((total, {price}) => total += price, 0))

  const totalDeliveryTime = cart.reduce((total, {delivery_time}) => total += delivery_time, 0)

  function applyCoupon () {
    setTotalPrice(totalPrice - 5)
    setIsClicked(true)
  }
  return (
    <>
      <h2>Cart</h2>
      <h3>Total Delivery Time: {totalDeliveryTime}</h3>
      <h3>Total Price: {totalPrice}</h3>
      {!!cart.length && <div>
        <button onClick={applyCoupon} disabled={isClicked}>Apply coupon</button>
        {isClicked && <p>Coupon Applied</p>}
      </div> }
      
      <div className="container">
      {
        cart.map(
          ({ id, name, description, price, image, delivery_time }) => (
            <div className="item-container">
              <img src={image} alt={name} />
              <div className="details-container">
                <p>Name: {name}</p>
                <p>Description: {description}</p>
                <p>Price: {price}</p>
                <p>Delivery Time: {delivery_time}</p>
              </div>
            </div>
          )
        )
      }
      </div>
    </>
  );
}

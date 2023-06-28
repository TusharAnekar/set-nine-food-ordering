import { NavLink } from "react-router-dom";

export function Header() {
  const getActiveStyle = ({ isActive }) => ({
    margin: "5px",
    color: isActive && "red",
  });

  return (
    <>
      <h1>Food Ordering App</h1>
      <NavLink to={"/"} style={getActiveStyle}>
        Home
      </NavLink>
      <NavLink to={"/menu"} style={getActiveStyle}>
        Menu
      </NavLink>
      <NavLink to={"/cart"} style={getActiveStyle}>
        Cart
      </NavLink>
    </>
  );
}

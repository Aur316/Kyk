import React, { CSSProperties } from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";

export const CartButton: React.FC = () => {
  const { openCart, cartQuantity } = useShoppingCart();

  const buttonStyle: CSSProperties = {
    background: "green",
    color: "white",
    padding: "10px 20px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  };

  const cartCountStyle: CSSProperties = {
    marginLeft: "10px",
    background: "red",
    color: "white",
    borderRadius: "50%",
    padding: "5px",
  };

  return (
    <>
      {cartQuantity > 0 && (
        <button onClick={openCart} style={buttonStyle}>
          Shopping Cart
          <span style={cartCountStyle}>{cartQuantity}</span>
        </button>
      )}
    </>
  );
};

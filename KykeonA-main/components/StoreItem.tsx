import React, { CSSProperties } from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";

const cardStyle: CSSProperties = {
  border: "1px solid #ccc",
  borderRadius: "8px",
  width: "300px",
  margin: "16px",
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const imageStyle: CSSProperties = {
  width: "100%",
  height: "150px",
  objectFit: "cover",
};

const buttonStyle: CSSProperties = {
  background: "#007bff",
  color: "white",
  padding: "10px 20px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "16px",
  margin: "0.5rem",
};

const quantityContainerStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.5rem",
};
const removeButtonStyle: CSSProperties = {
  background: "red", // red background
  color: "white",
  padding: "8px 16px", // slightly smaller than the blue buttons
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "14px", // smaller font size
  margin: "0.5rem",
};

const quantityRowStyle: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "0.5rem",
};

interface StoreItemProps {
  id: string;
  name: string;
  price: number;
  img: string;
  desc1?: string;
  description: string;
}
export const StoreItem: React.FC<StoreItemProps> = ({
  id,
  name,
  price,
  img,
  desc1,
  description,
}) => {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
  const quantity = getItemQuantity(id);
  return (
    <div style={cardStyle}>
      <img src={img} alt={name} style={imageStyle} />
      <h2 style={{ color: "white" }}>{name}</h2>
      <p>Price: €{price}</p>
      <p>{desc1}</p>
      <p>{description}</p>
      <div style={quantityContainerStyle}>
        {quantity === 0 ? (
          <button
            style={buttonStyle}
            onClick={() => increaseCartQuantity(id, name, price, img)}
          >
            Add to Cart
          </button>
        ) : (
          <>
            <div style={quantityRowStyle}>
              <button
                style={buttonStyle}
                onClick={() => decreaseCartQuantity(id)}
              >
                -
              </button>
              <div style={{ color: "white" }}>
                <span>{quantity}</span> in cart
              </div>
              <button
                style={buttonStyle}
                onClick={() => increaseCartQuantity(id, name, price, img)}
              >
                +
              </button>
            </div>
            <button
              style={removeButtonStyle}
              onClick={() => removeFromCart(id)}
            >
              Remove
            </button>
          </>
        )}
      </div>
    </div>
  );
};

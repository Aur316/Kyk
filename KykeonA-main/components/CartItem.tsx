import React, { CSSProperties } from "react";

export type CartItemProps = {
  id: string;
  quantity: number;
  name: string;
  price: number;
  img: string;
};

const cartItemStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "16px",
  margin: "0.8rem",
};

const imageStyle: CSSProperties = {
  width: "150px",
  height: "100px",
  objectFit: "cover",
  gap: "0.5rem",
};

const nameQuantityContainer: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
};

export function CartItem({ id, quantity, name, price, img }: CartItemProps) {
  if (!name || price === undefined || !img) return null;

  return (
    <div style={cartItemStyle}>
      <img src={img} alt={name} style={imageStyle} />
      <div style={nameQuantityContainer}>
        <div>{name}</div>
        {quantity > 1 && (
          <span style={{ fontSize: ".65rem", color: "gray" }}>
            {quantity}x{price}
          </span>
        )}
      </div>
    </div>
  );
}

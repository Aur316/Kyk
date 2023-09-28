import React, { CSSProperties, useState, useEffect } from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { CartItem } from "./CartItem";

type ShoppingCartProps = {
  isOpen: boolean;
};
type StoreItemType = {
  _id: string;
  name: string;
  price: number;
  img: string;
  desc1: string;
  description: string;
};

const offCanvasStyle: CSSProperties = {
  position: "fixed",
  top: 0,
  right: 0,
  width: "300px",
  height: "100%",
  backgroundColor: "#fff",
  overflowY: "auto",
  transform: "translateX(100%)",
  transition: "transform 0.3s ease-in-out",
};

const offCanvasOpenStyle: CSSProperties = {
  ...offCanvasStyle,
  transform: "translateX(0)",
};

export const ShoppingCart: React.FC<ShoppingCartProps> = ({ isOpen }) => {
  const { closeCart, cartItems } = useShoppingCart();
  const [storeItems, setStoreItems] = useState<StoreItemType[]>([]);

  useEffect(() => {
    const fetchStoreItems = async () => {
      try {
        const res = await fetch("/api/fetchStoreItems");
        const data = await res.json();
        setStoreItems(data);
      } catch (error) {
        console.error("Failed to fetch store items", error);
      }
    };

    fetchStoreItems();
  }, []);

  const detailedCartItems = cartItems.map((cartItem) => {
    const storeItem = storeItems.find((item) => item._id === cartItem.id);
    return {
      ...cartItem,
      name: storeItem?.name || "",
      price: storeItem?.price || 0,
      img: storeItem?.img || "",
    };
  });

  return (
    <div style={isOpen ? offCanvasOpenStyle : offCanvasStyle}>
      <header>
        <h2>Cart</h2>
        <button onClick={closeCart}>Close</button>
      </header>
      <main>
        {detailedCartItems.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
        <div>
          Total:{" "}
          {detailedCartItems.reduce((total, cartItem) => {
            return total + cartItem.price * cartItem.quantity;
          }, 0)}
        </div>
      </main>
    </div>
  );
};

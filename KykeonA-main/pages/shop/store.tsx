import React, { CSSProperties, useState, useEffect } from "react";
import { StoreItem } from "../../components/StoreItem";
import { CartButton } from "../../components/CartButton";
import Link from "next/link";

const containerStyle: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
  color: "white",
};

export default function Store() {
  const [storeItems, setStoreItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStoreItems = async () => {
      try {
        const res = await fetch("/api/fetchStoreItems");
        const data = await res.json();
        setStoreItems(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch store items", error);
        setLoading(false);
      }
    };

    fetchStoreItems();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <CartButton />
      <button
        style={{ background: "white" }}
        type="button"
        onClick={() => {
          window.location.href = "/shop/checkoutpage";
        }}
      >
        Go to Checkout
      </button>

      <div style={containerStyle}>
        {storeItems.map((item: any) => (
          <StoreItem
            key={item._id}
            id={item._id}
            name={item.name}
            price={item.price}
            img={item.img}
            desc1={item.desc1}
            description={item.description}
          />
        ))}
      </div>
    </>
  );
}

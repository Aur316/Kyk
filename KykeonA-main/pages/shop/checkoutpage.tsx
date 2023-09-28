import { CartItemProps, CartItem } from "../../components/CartItem";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import PaypalPage from "./paypalpage";
import Link from "next/link";
import CheckoutButton from "../../components/CheckoutButton";
import { Button } from "antd";
import React, { CSSProperties } from "react";

const cardStyle: CSSProperties = {
  color: "white",
  border: "1px solid #ccc",
  padding: "8px",
  margin: "8px",
  borderRadius: "4px",
  width: "240px",
};

const CheckoutPage: React.FC = () => {
  const [cart, setCart] = useLocalStorage<CartItemProps[]>("shopping-cart", []);

  if (cart.length === 0) {
    return <div style={{ color: "white" }}>Your cart is empty</div>;
  }

  const totalCost = cart.reduce((sum, item) => {
    return sum + (item.price || 0) * item.quantity;
  }, 0);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto",
        width: "fit-content",
      }}
    >
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {cart.map((item: CartItemProps, index: number) => (
          <div style={cardStyle} key={index}>
            <CartItem
              id={item.id}
              quantity={item.quantity}
              name={item.name}
              price={item.price}
              img={item.img}
            />
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "top",
          gap: "35px",
          marginTop: "25px",
          width: "100%",
        }}
      >
        {" "}
        <PaypalPage cart={cart} />
        <div style={{}}>
          {" "}
          <Link href="/shop/store">
            <Button type="default">Back to Store</Button>
          </Link>
          <div style={{ color: "white", marginTop: "16px" }}>
            Total cost: ${totalCost.toFixed(2)}
          </div>
        </div>
        <CheckoutButton cart={cart} />
      </div>
      <br />
      <p className="text-center">
        For each Analysis you will have to Fill Out a Form after the Purchase.
      </p>
    </div>
  );
};

export default CheckoutPage;

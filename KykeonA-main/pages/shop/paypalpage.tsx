import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from "next/router";
import { CartItemProps } from "../../components/CartItem";
import handlePurchaseHook from "../../hooks/handlePurchase";

const PaypalPage: React.FC<{ cart: CartItemProps[] }> = ({ cart }) => {
  const router = useRouter();

  return (
    <PayPalScriptProvider
      options={{
        clientId:
          "AZr5_SaA24roOVs-N6vUHMV-60NHLkPs3GD_qrWoPtMgYWM0uiX2dyor-AN6bZ1FFAHtvCaY7lZaOnjV",
      }}
    >
      <div>
        <PayPalButtons
          createOrder={() => {
            return fetch("/api/paypal", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                items: cart.map((item) => ({
                  id: item.id,
                  quantity: item.quantity,
                })),
              }),
            })
              .then((res) => {
                if (res.ok) return res.json();
                return res.json().then((json) => Promise.reject(json));
              })
              .then(({ id }) => {
                return id;
              })
              .catch((e) => {
                console.error(e.error);
              });
          }}
          onApprove={async (data, actions) => {
            await handlePurchaseHook(cart);

            try {
              if (actions.order) {
                await actions.order.capture();
                router.push("/shop/disclaimer");
              } else {
                throw new Error("Order undefined.");
              }
            } catch (error) {
              console.error(error);
            }
            return Promise.resolve();
          }}
        />
      </div>
    </PayPalScriptProvider>
  );
};

export default PaypalPage;

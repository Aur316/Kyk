import "../devlink/global.css";
import "tailwindcss/tailwind.css";
import "../styles/index.css";
import type { AppProps } from "next/app";
import { DevLinkProvider } from "../devlink/devlinkContext";
import "antd/dist/antd.css";
import { ShoppingCartProvider } from "../context/ShoppingCartContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ShoppingCartProvider>
        <DevLinkProvider>
          <Component {...pageProps} />
        </DevLinkProvider>
      </ShoppingCartProvider>
    </>
  );
}

export default MyApp;

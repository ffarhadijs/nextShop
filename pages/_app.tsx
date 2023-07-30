import "../styles/globals.css";
import type { AppProps } from "next/app";
import StoreProvider from "../utils/Store";
import Layout from "../components/layout/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StoreProvider>
  );
}

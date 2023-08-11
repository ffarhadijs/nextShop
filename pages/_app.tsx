import "../styles/globals.css";
import type { AppProps } from "next/app";
import StoreProvider from "../utils/Store";
import Layout from "../components/layout/Layout";
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <StoreProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </StoreProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

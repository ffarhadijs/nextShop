import "../styles/globals.css";
import type { AppProps } from "next/app";
import StoreProvider from "../utils/Store";
import Layout from "../components/layout/Layout";
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";
import { useState } from "react";
import Head from "next/head";
import { NextComponentType, NextPageContext } from "next";
import { useEffect } from 'react';
import NProgress from 'nprogress';
import { useRouter } from "next/router";


type CustomProps = AppProps & {
  Component: NextComponentType<NextPageContext, any, any> & {
    title: string;
    description: string;
  };
};
export default function App({ Component, pageProps }: CustomProps) {
  const {events} = useRouter()
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
  useEffect(() => {
    events.on('routeChangeStart', () =>  NProgress.start());

    events.on('routeChangeComplete', () =>  NProgress.done());
    events.on('routeChangeError', () =>  NProgress.done());
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>{Component.title}</title>
        <meta name="description" content={Component.description} />
      </Head>
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

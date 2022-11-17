import { ReactNode, ReactElement, useState, useEffect } from "react";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { NextPage } from "next";

import Layout from "components/common/Layout";

import "tailwindcss/tailwind.css";
import {
  QueryClientProvider,
  Hydrate,
  QueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(() => new QueryClient());
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);
  const router = useRouter();

  useEffect(() => {
    if (router.pathname !== "/sign-in") {
      if (!Cookies.get("accessToken")) router.push("sign-in");
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <RecoilRoot>{getLayout(<Component {...pageProps} />)}</RecoilRoot>
      </Hydrate>
    </QueryClientProvider>
  );
}

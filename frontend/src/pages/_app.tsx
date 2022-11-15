import type { ReactNode, ReactElement } from "react";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { NextPage } from "next";

import Layout from "components/common/Layout";

import "tailwindcss/tailwind.css";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return <RecoilRoot>{getLayout(<Component {...pageProps} />)}</RecoilRoot>;
}

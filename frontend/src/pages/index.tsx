import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useAccessTokenValue } from "stores/accessToken.recoil";

export default function Home() {
  const accessToken = useAccessTokenValue();

  return (
    <>
      <Head>
        <title>원티드 프론트엔드 7차</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>메인 페이지입니다.</div>
      <div>{accessToken}</div>
    </>
  );
}

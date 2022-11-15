import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>원티드 프론트엔드 7차 - 사용자</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>사용자 목록입니다.</div>
    </>
  );
}
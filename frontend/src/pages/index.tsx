import axios from "axios";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>원티드 프론트엔드 7차</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <button
        onClick={() => {
          try {
            axios.get("/api/test/123");
          } catch {}
        }}
      >
        클릭
      </button>
      <div>메인 페이지입니다.</div>
    </>
  );
}

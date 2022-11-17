import AccountsContainer from "components/views/Accounts";
import Head from "next/head";

export default function Accounts() {
  return (
    <>
      <Head>
        <title>원티드 프론트엔드 7차 - 계좌 목록</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AccountsContainer />
    </>
  );
}

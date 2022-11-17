import UsersCRUDContainer from "components/views/UsersCRUD/UsersCRUDContainer";
import Head from "next/head";

export default function Users() {
  return (
    <>
      <Head>
        <title>원티드 프론트엔드 7차 - 사용자</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <UsersCRUDContainer />
    </>
  );
}

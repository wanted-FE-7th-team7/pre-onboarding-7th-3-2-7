import UsersCRUDContainer from "components/views/UsersCRUD/UsersCRUDContainer";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Users() {
  const [pid, setPid] = useState("0");
  const router = useRouter();
  return (
    <>
      <Head>
        <title>원티드 프론트엔드 7차 - 사용자</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          router.push(`/users/${pid}`);
        }}
      >
        <input
          type="number"
          onChange={({ target: { value } }) => setPid(value)}
        />
        <button type="submit">이동</button>
      </form>
    </>
  );
}

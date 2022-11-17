import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface Props {
  children: React.ReactElement | React.ReactElement[];
}

function Layout({ children }: Props) {
  const router = useRouter();

  return (
    <div className="flex h-screen w-screen">
      <nav className="align-center flex w-1/12 flex-col gap-12">
        <h1 className="w-full cursor-pointer text-center text-3xl leading-8">
          마크
        </h1>
        <Link
          href="/dashboard"
          className="w-full cursor-pointer text-center text-xl leading-6"
        >
          대시보드
        </Link>
        <Link
          href="/accounts"
          className="w-full cursor-pointer text-center text-xl leading-6"
        >
          계좌목록
        </Link>
        <Link
          href="/users"
          className="w-full cursor-pointer text-center text-xl leading-6"
        >
          사용자
        </Link>
        <Link
          href="/usersCRUD"
          className="w-full cursor-pointer text-center text-xl leading-6"
        >
          사용자 [CRUD]
        </Link>
        <button
          onClick={() => {
            router.push("/sign-in");
          }}
          className="w-full cursor-pointer text-center text-xl leading-6"
        >
          로그아웃
        </button>
      </nav>

      <div className="flex h-full w-11/12 flex-col justify-between">
        <header className="flex h-16 w-full items-center justify-center bg-slate-100">
          <h1 className="text-3xl font-bold">원티드 프론트엔드 7차</h1>
        </header>

        <main className="h-full overflow-auto bg-gray-300">{children}</main>

        <footer className="flex h-16 w-full items-center justify-center bg-slate-100">
          <h3>원티드 프론트엔드 7차 7팀</h3>
        </footer>
      </div>
    </div>
  );
}

export default Layout;

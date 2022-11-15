import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface Props {
  children: React.ReactElement | React.ReactElement[];
}

function Layout({ children }: Props) {
  const router = useRouter();

  return (
    <div className="flex w-screen h-screen">
      <nav className="flex flex-col w-1/12 gap-12 align-center">
        <h1 className="w-full text-3xl leading-8 text-center cursor-pointer">
          마크
        </h1>
        <Link
          href="/dashboard"
          className="w-full text-xl leading-6 text-center cursor-pointer"
        >
          대시보드
        </Link>
        <Link
          href="/accounts"
          className="w-full text-xl leading-6 text-center cursor-pointer"
        >
          계좌목록
        </Link>
        <Link
          href="/users"
          className="w-full text-xl leading-6 text-center cursor-pointer"
        >
          사용자
        </Link>
        <button
          onClick={() => {
            router.push("/sign-in");
          }}
          className="w-full text-xl leading-6 text-center cursor-pointer"
        >
          로그아웃
        </button>
      </nav>

      <div className="flex flex-col justify-between w-11/12 h-full">
        <header className="flex items-center justify-center w-full h-16 bg-slate-100">
          <h1 className="text-3xl font-bold">원티드 프론트엔드 7차</h1>
        </header>

        <main className="h-full overflow-auto bg-gray-300">{children}</main>

        <footer className="flex items-center justify-center w-full h-16 bg-slate-100">
          <h3>원티드 프론트엔드 7차 7팀</h3>
        </footer>
      </div>
    </div>
  );
}

export default Layout;

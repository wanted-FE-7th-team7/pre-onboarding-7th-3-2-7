import axios from "axios";
import { useRouter } from "next/router";
import React, { useRef } from "react";

const SignInPage = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const signIn: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (emailRef.current && pwdRef.current) {
      const email = emailRef.current.value;
      const password = pwdRef.current.value;

      try {
        const { data } = await axios.post<{ email: string; password: string }>(
          "/api/sign-in",
          {
            email,
            password,
          }
        );
        router.push("/");
      } catch {}
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <form
        onSubmit={signIn}
        className="flex flex-col items-center justify-center gap-7"
      >
        <input
          className="text-3xl text-center"
          type="text"
          placeholder="email"
          ref={emailRef}
        />
        <input
          className="text-3xl text-center"
          type="password"
          placeholder="pwd"
          ref={pwdRef}
        />
        <input
          className="m-5 text-3xl text-center cursor-pointer"
          type="submit"
          value="로그인"
        />
      </form>
    </div>
  );
};

SignInPage.getLayout = (page: React.ReactElement) => <>{page}</>;

export default SignInPage;

import { useRouter } from "next/router";
import React, { useRef } from "react";
import { postSignIn } from "services/sign";
import { useAccessTokenState } from "stores/accessToken.recoil";
import Cookies from "js-cookie";

interface Props {}
function SignInContainer({}: Props) {
  const emailRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [, setAccessToken] = useAccessTokenState();

  const signIn: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    if (emailRef.current && pwdRef.current) {
      const email = emailRef.current.value;
      const password = pwdRef.current.value;

      try {
        const {
          data: { accessToken },
        } = await postSignIn(email, password);
        Cookies.set("accessToken", accessToken);
        router.push("/");
      } catch {
        //TODO: 에러 발생 시 구현
      }
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
}

export default SignInContainer;

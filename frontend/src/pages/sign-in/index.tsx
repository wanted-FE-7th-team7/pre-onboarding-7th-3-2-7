import React, { useRef } from "react";

const SignInPage = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null);

  const signIn: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (emailRef.current && pwdRef.current) {
      const email = emailRef.current.value;
      const password = pwdRef.current.value;

      const temp = await fetch("/api/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const temp2 = await temp.json();
      console.log(temp2);
    }
  };

  return (
    <div>
      <form onSubmit={signIn}>
        <input type="text" placeholder="email" ref={emailRef} />
        <input type="password" placeholder="pwd" ref={pwdRef} />
        <input type="submit" value="로그인" />
      </form>
    </div>
  );
};

export default SignInPage;

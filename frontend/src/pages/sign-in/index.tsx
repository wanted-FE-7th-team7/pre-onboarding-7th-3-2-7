import { SignInContainer } from "components/views/SignIn";
import React from "react";

const SignInPage = () => {
  return <SignInContainer />;
};

SignInPage.getLayout = (page: React.ReactElement) => <>{page}</>;

export default SignInPage;

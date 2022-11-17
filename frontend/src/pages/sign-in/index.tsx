import SignInContainer from "components/views/SignIn";
import React from "react";

const SignIn = () => {
  return <SignInContainer />;
};

SignIn.getLayout = (page: React.ReactElement) => <>{page}</>;

export default SignIn;

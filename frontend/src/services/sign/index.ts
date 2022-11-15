import axios from "axios";

export interface AccessToken {
  accessToken: string;
}

export const postSignIn = (email: string, password: string) =>
  axios.post<AccessToken>("/api/sign-in", {
    email,
    password,
  });

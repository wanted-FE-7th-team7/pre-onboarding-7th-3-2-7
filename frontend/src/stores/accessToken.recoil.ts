import { atom, useRecoilState, useRecoilValue } from "recoil";

import { STORE_KEYS } from "./storeKeys";

const accessTokenAtom = atom({
  key: STORE_KEYS.accessToken,
  default: "",
});

export const useAccessTokenValue = () => useRecoilValue(accessTokenAtom);
export const useAccessTokenState = () => useRecoilState(accessTokenAtom);

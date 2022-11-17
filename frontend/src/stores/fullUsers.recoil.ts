import { User } from "components/views/UsersCRUD/models/User";
import { atom, useRecoilState } from "recoil";

const fullUsersState = atom<User[]>({
  key: "fullUsersState",
  default: [],
});

export const useFullUsersState = () => useRecoilState(fullUsersState);

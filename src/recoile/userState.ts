import { atom } from "recoil";
// import { User } from "../types/type1";

export const UserState = atom<string[]>({
  key: "USER_STATE",
  default: [],
});

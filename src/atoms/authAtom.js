import { atom } from "recoil";

export const authState = atom({
  key: "isAuthState", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

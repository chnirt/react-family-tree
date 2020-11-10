import { atom } from "recoil";

export const loadingState = atom({
  key: "isLoadingState", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

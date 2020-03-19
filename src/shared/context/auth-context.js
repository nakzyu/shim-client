import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: "dsad",
  login: () => {},
  logout: () => {}
});

import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: "dasdd",
  token: "null",
  image: null,
  login: () => {},
  logout: () => {}
});

import { createContext } from "react";

const userContext = createContext({
  profile: "",
  username: "",
  handle: "",
});

export default userContext;

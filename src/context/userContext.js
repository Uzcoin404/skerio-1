import { createContext } from "react";
const UserContext = createContext({
  sportTypeId: 1,
  changeSportTypeId: (id) => {},
  initLan: "uz",
});
export default UserContext;

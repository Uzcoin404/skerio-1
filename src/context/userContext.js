import { createContext } from "react";
const UserContext = createContext({
    sportTypeId: 1,
    changeSportTypeId: (id) => {},
});
export default UserContext;
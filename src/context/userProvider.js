import React, { useContext, useState } from "react";
import UserContext from "./userContext";

const UserContextProvider = (props) => {
  const userCtx = useContext(UserContext);
  const [id, setId] = useState(userCtx.sportTypeId);

  // ishchi funksiya barcha logika shu yerda bo'ladi
  const handleChangeSportId = (id) => {
    setId(id);
  };
  const handleChangeLanguage = () => {};

  return (
    <UserContext.Provider
      value={{
        sportTypeId: id,
        changeSportTypeId: handleChangeSportId,
        initLan: handleChangeLanguage,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

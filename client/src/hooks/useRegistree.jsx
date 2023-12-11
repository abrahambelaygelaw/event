import React, { useContext } from "react";
import RegistreeContext from "../context/RegistreeProvider";
const useRegistree = () => {
  return useContext(RegistreeContext);
};
export default useRegistree;

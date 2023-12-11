import React from "react";
import RegistreeForm from "./RegistreeForm";
import { RegistreeProvider } from "../../context/RegistreeProvider";
const Registree = () => {
  console.log("hbnjmk");
  return (
    <RegistreeProvider>
      <RegistreeForm />
    </RegistreeProvider>
  );
};

export default Registree;

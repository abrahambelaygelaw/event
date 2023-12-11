import React, { createContext, useState } from "react";
const RegistreeContext = createContext();
export const RegistreeProvider = ({ children }) => {
  const [showForm, setShowForm] = useState(true);
  return (
    <RegistreeContext.Provider
      value={{
        showForm,
        setShowForm,
      }}
    >
      {children}
    </RegistreeContext.Provider>
  );
};

export default RegistreeContext;

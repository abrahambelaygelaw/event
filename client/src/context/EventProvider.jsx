import React, { createContext, useState } from "react";
const EventContext = createContext();
export const EventProvider = ({ children }) => {
  const [itemToDelte, setItemToDelete] = useState(null);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [showForm, setShowForm] = useState(true);
  return (
    <EventContext.Provider
      value={{
        itemToDelte,
        setItemToDelete,
        showForm,
        setShowForm,
        itemToEdit,
        setItemToEdit,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export default EventContext;

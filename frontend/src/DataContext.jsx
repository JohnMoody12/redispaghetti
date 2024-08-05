import React, { createContext, useState, useContext, ReactNode } from "react";

export const DataContext = createContext();

// Create the provider component
export const DataProvider = ({ children }) => {
  const [escalations, setEscalations] = useState([]);
  const [thisEscalation, setThisEscalation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <DataContext.Provider
      value={{
        escalations,
        setEscalations,
        thisEscalation,
        setThisEscalation,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
};

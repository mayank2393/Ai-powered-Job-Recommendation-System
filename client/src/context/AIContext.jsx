import React, { createContext, useContext, useState } from "react";

const AIContext = createContext(null);

/**
 * AIProvider manages AI-related global data.
 * For now, placeholder context for AI match data if extended.
 */
export const AIProvider = ({ children }) => {
  const [aiData, setAIData] = useState(null);

  return (
    <AIContext.Provider value={{ aiData, setAIData }}>
      {children}
    </AIContext.Provider>
  );
};

export const useAIContext = () => {
  const context = useContext(AIContext);
  if (!context) {
    throw new Error("useAIContext must be used within AIProvider");
  }
  return context;
};

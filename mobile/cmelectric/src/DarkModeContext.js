// import React, { createContext, useState } from 'react';

// const DarkModeContext = createContext();

// export const DarkModeProvider = ({ children }) => {
//   const [darkModeEnabled, setDarkModeEnabled] = useState(false);

//   return (
//     <DarkModeContext.Provider value={{ darkModeEnabled, setDarkModeEnabled }}>
//       {children}
//     </DarkModeContext.Provider>
//   );
// };

// export default DarkModeContext;

// DarkModeContext.js

import React, { createContext, useState, useContext } from 'react';

const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  return (
    <DarkModeContext.Provider value={{ darkModeEnabled, setDarkModeEnabled }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
};

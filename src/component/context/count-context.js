import React, { useState } from "react";

const CountContext = React.createContext();

export const CountContextProvider = (props) => {
  const [count, setCount] = useState(0);

  const increaseCount = () => {
    setCount((count) => count + 1);
  };
  const contextObj = {
    count,
    increaseCount,
  };

  return (
    <CountContext.Provider value={contextObj}>
      {props.children}
    </CountContext.Provider>
  );
};

export default CountContext;

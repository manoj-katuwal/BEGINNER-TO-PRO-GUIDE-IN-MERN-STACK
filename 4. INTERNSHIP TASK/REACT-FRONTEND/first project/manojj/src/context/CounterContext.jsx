import React, { createContext, useContext, useState } from 'react';

// Context create gareko
export const CounterContext = createContext();

// Provider component banāeko
export const CounterProvider = ({ children }) => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  return (
    <CounterContext.Provider value={{ count, increment, decrement, reset }}>
      {children}
    </CounterContext.Provider>
  );
};


export const useCounter = () => useContext(CounterContext);
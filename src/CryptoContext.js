import React, { children } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';

const Crypto = createContext();

const CryptoContext = ({children}) => {

  const [currency, setCurrency] = useState("INR");
  const [symbol, SetSymbol] = useState("₹");

  useEffect(() => {
    if (currency==="INR") SetSymbol("₹");
    else if(currency === "USD") SetSymbol("$");
  },[currency])

  return (
    <Crypto.Provider value={{currency, symbol, setCurrency}}>
    {children}
    </Crypto.Provider>
  )
}

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
}
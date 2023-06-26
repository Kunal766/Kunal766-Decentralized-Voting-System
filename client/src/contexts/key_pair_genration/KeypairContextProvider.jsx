import { useState } from 'react';
import KeypairContext from './KeypairContext';

const KeypairContextProvider = ({ children }) => {
  const [myKeypair, setMykeypair] = useState({privatekey:"hia",publicKey:"jans"});
  
  const updatemyKeypair = (newValue) => {
    setMykeypair(newValue);
  };

  return (
    <KeypairContext.Provider value={{ myKeypair, updatemyKeypair}}>
      {children}
    </KeypairContext.Provider>
  );
}

export default KeypairContextProvider;


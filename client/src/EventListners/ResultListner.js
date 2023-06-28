import React, { useState, useEffect } from 'react';
import useEth from '../contexts/EthContext/useEth';

function ResulListener() {
  const Ethcontext = useEth();
  const [res, setRes] = useState("kunal");

  useEffect(() => {
    const listener = Ethcontext.state.contract.events.winner_chage()
      .on('data', (event) => {
        console.log('Transfer event emitted:', event);
        // setRes(event.returnValues);
      })
      .on('error', console.error);

    return () => {
      // Unsubscribe from the event when the component is unmounted
      listener.unsubscribe();
    };
  }, []);

  return (
    <div>
      {res}
    </div>
  );
}

export default ResulListener;

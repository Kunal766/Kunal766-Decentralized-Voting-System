import React, { useState,useEffect } from 'react';
import EthContext  from '../contexts/EthContext/useEth';
import Button from 'react-bootstrap/Button'

function Result() {

  //context of injected web3 by wallet
 const  Ethcontext=EthContext();

 
 const [res,setres]=useState("");


 //fetching options from contact
const getData=async()=>{
  await Ethcontext.state.contract.methods.winner().call((error, result) => {
    if (error) {
      console.error(error);
    } else {
      console.log(result);
      setres(result);
    }
  });
}


  return (
    <div>
      <Button onClick={getData} className="button-84">Fetch Result</Button>
      {res}
    </div>
  );
}

export default Result;

import React, { useState,useEffect } from 'react';
import './form.css';
import EthContext  from '../contexts/EthContext/useEth';
import Button from 'react-bootstrap/Button'
import { useKeypair } from '../contexts/key_pair_genration';
// require('dotenv').config();


function Form() {

  //context of injected web3 by wallet
 const  Ethcontext=EthContext();
 const { myKeypair, updatemyKeypair} =useKeypair();

 



//handleing  voteing 
const handleSubmit = async(event) => {
  event.preventDefault();
  try{
  const message =   Ethcontext.state.web3.utils.sha3(selectedOption);
  const signature =   Ethcontext.state.web3.eth.accounts.sign(message, formData.privatekey).signature;
  const result = await   Ethcontext.state.contract.methods.Vote(formData.publicKey, message, signature,selectedOption).send({from:"0x18Aa656029469F7CCA30fA51905e11472e4ae498"});
  console.log(result);
  }
  catch(error){
        
    console.log(error);
  }

};
 //satate of options
 const [options,setoptions]=useState([])


 //fetching options from contact
const getData=async()=>{
  await Ethcontext.state.contract.methods.optionsList().call({from: "0x18Aa656029469F7CCA30fA51905e11472e4ae498"}, function(error, result){
  setoptions(result);
  console.log(error, result);
})
};


  //staets of variable for this page
  const [selectedOption, setSelectedOption] = useState("");
  const [formData, setFormData] = useState({
    privatekey:'',
    publicKey:''
  });


  //when new keypair created
 useEffect(() => {
setFormData(myKeypair)}, [myKeypair]);


//  handleing cahenge in states
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    console.log(name, value);
  };
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    console.log(event.target.value)
  };



  return (
    <div>
      <Button onClick={getData} className="button-84">Fetch Options</Button>
    <form >
      <label>
        PrivateKey:
        <input type="text" name="privatekey" value={formData.privatekey} onChange={handleInputChange} />
      </label>
      <label>
      publicKey:
        <input type="text" name="publicKey" value={formData.publicKey} onChange={handleInputChange} />
      </label>
      <label>
        Options:
        <select value={selectedOption} onChange={handleOptionChange}>
          <option value="">--Please choose an option--</option>
          {options.map((option,i) =>{return <option value={option} key={i}>{option}</option>
             })}
        </select>
      </label>
      <Button type="submit" className='button-53' onClick={handleSubmit}>Vote</Button>
    </form>
    </div>
  );
}

export default Form;

import  {useState,useEffect}from 'react'
import EthContext from "../contexts/EthContext/useEth"
import { useKeypair } from '../contexts/key_pair_genration';


function Admin() {
   const Ethcontext = EthContext();
   const [publickey,setpublickey] =useState("");
   const [option, setoption] = useState("");

   const { myKeypair, updatemyKeypair} =useKeypair();

   useEffect(() => {
    setpublickey(myKeypair.publicKey);}, [myKeypair]);
    
    

   const submitHandler =(e)=>{
    e.preventDefault();
       console.log(Ethcontext.state.accounts)
       Ethcontext.state.contract.methods.addVoter(publickey).send({from:String(Ethcontext.state.accounts)},function(err, result){console.log(result)});
   }

   const submitHandleroptions =(e)=> {
    e.preventDefault();
    console.log(JSON.stringify(Ethcontext.state.accounts),Ethcontext.state.networkID)
    Ethcontext.state.contract.methods.addOption(option).send({from: String(Ethcontext.state.accounts), "chainId":1337},function(err, result){console.log(result)
    console.log(err)});
   }

  return (<>
  <div> ADD Voter</div>
    <form>
        <input type="text" name="publickey" value={publickey} onChange={(e)=>{setpublickey(e.target.value)}}></input>
        <input type="submit" onClick={submitHandler}></input>
    </form>
<div> ADD Options</div>
    <form>
        <input type="text" name="publickey" value={option} onChange={(e)=>{setoption(e.target.value)}}></input>
        <input type="submit" onClick={submitHandleroptions}></input>
    </form>
    </>
  )
}

export default Admin
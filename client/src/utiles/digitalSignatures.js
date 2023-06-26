import Web3 from 'web3';

var digitalSignatures= (privateKey,message)=>{
const web3 = new Web3();
// Sign the message with the private key
const signature = web3.eth.accounts.sign(message, privateKey);
console.log(signature);




return  signature;

}


export default digitalSignatures
import Web3  from "web3";
const web3 = new Web3();


function createKeypair(){
const newAccount = web3.eth.accounts.create();
console.log('Public key:', newAccount.address);
console.log('Private key:', newAccount.privateKey);
return {publicKey: newAccount.address, privatekey: newAccount.privateKey}
}

export default createKeypair
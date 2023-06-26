import  React  from "react";
import Createkeypair from "../utiles/CreatePublicPrivatekeypair"
import  useKeypair  from "../contexts/key_pair_genration/useKeypair";

function CreatenewKeyPair() {

    const { myKeypair, updatemyKeypair} =useKeypair();
      
     function clickHandler() {
        updatemyKeypair(Createkeypair());
        //   console.log( myState,  updateState);
     }

    return (
        <div>
              <button onClick={()=>{clickHandler()}}>Create</button>
               <textarea value={JSON.stringify(myKeypair)} onChange={()=>{alert(myKeypair)}} col ="10" rows ="10"></textarea>
        </div>
    )

};

export default CreatenewKeyPair




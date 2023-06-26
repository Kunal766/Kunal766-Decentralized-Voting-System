import { useContext } from "react";
import KeypairContext from "./KeypairContext";

const useKeypair = () => useContext(KeypairContext);

export default useKeypair;
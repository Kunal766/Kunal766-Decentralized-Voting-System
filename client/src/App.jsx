//context Providers
import { EthProvider } from "./contexts/EthContext";
import KeypairContextProvider from "./contexts/key_pair_genration/KeypairContextProvider";


// Routing modules
import {
  BrowserRouter as Router,
  Route,
  Routes
  
} from "react-router-dom";

//components
import Form from "./Components/form"
import CreatKey from "./Components/createnewKeyPair"
import Admin from "./Components/admin"

//bootstrap csse
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import {LinkContainer} from 'react-router-bootstrap'



function App() {
  return (
    <EthProvider>
      <KeypairContextProvider>
      <Router>
      <Navbar bg="dark" variant="dark" >
        <Container  >
         <LinkContainer to="/">
          <Navbar.Brand >Fair Vote</Navbar.Brand>
         </LinkContainer>
          <Nav className="me-auto">
          <LinkContainer to="/">
          <Nav.Link>Vote</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/key">
          <Nav.Link >Key</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/admin">
          <Nav.Link>admin</Nav.Link>
          </LinkContainer>
          </Nav>
        </Container>
        </Navbar>
      <Routes>
        <Route exact path="/" element={<Form/>}/>
        <Route  path="/key" element={<CreatKey/>}/>
        <Route path="/admin" element={<Admin/>}/>
        </Routes>
    </Router>
    </KeypairContextProvider>
    </EthProvider>
  );
}

export default App;

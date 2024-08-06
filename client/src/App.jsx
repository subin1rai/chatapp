import {Routes, Route, Navigate} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/chat";
import Navbar from "./components/AppNavbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from 'react-bootstrap';
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const{user} = useContext(AuthContext);
  return (
    <>
    <Navbar/>
    <Container className="tet">

    <Routes>

          <Route path="/" element={user ? <Chat/>: <Login/> } />
          <Route path="/login" element={user ? <Chat/>:<Login/>} />
          <Route path="/register" element={ user ? <Chat/>:<Register/>} />
          <Route path="/*" element={<Navigate to="/"/>} />
    </Routes>
    </Container>

    </>
  )
}

export default App
